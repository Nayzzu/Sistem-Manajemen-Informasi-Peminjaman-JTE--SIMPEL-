<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\Facility;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class BookingTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_view_facilities_and_create_booking(): void
    {
        $user = User::factory()->create();
        $facility = Facility::create([
            'name' => 'Proyektor Test',
            'category' => 'inventaris',
            'description' => 'Untuk presentasi',
            'needs_kajur_approval' => false,
            'is_available' => true,
        ]);

        $this->actingAs($user)->get('/facilities')->assertOk();

        $start = now()->addHours(2)->format('Y-m-d\TH:i');
        $end = now()->addHours(4)->format('Y-m-d\TH:i');

        $response = $this->actingAs($user)->post('/bookings', [
            'facility_id' => $facility->id,
            'start_time' => $start,
            'end_time' => $end,
            'reason' => 'Presentasi Tugas Akhir',
        ]);

        $response->assertRedirect(route('bookings.history'));
        $this->assertDatabaseHas('bookings', [
            'user_id' => $user->id,
            'facility_id' => $facility->id,
            'status' => 'pending',
        ]);
    }

    public function test_overlapping_booking_is_rejected(): void
    {
        $user = User::factory()->create();
        $facility = Facility::create([
            'name' => 'Ruang H5',
            'category' => 'ruangan',
            'description' => 'Ruang kelas',
            'needs_kajur_approval' => false,
            'is_available' => true,
        ]);

        Booking::create([
            'user_id' => $user->id,
            'facility_id' => $facility->id,
            'start_time' => now()->addHours(2),
            'end_time' => now()->addHours(5),
            'reason' => 'Kuliah umum',
            'status' => 'approved',
        ]);

        $response = $this->actingAs($user)->post('/bookings', [
            'facility_id' => $facility->id,
            'start_time' => now()->addHours(3)->format('Y-m-d\TH:i'),
            'end_time' => now()->addHours(4)->format('Y-m-d\TH:i'),
            'reason' => 'Rapat himpunan',
        ]);

        $response->assertSessionHasErrors('start_time');
    }

    public function test_kajur_facility_requires_attachment_and_admin_can_approve(): void
    {
        Storage::fake('public');

        $student = User::factory()->create();
        $admin = User::factory()->create(['role' => 'admin']);
        $facility = Facility::create([
            'name' => 'Lab Komputer',
            'category' => 'laboratorium',
            'description' => 'Lab praktikum',
            'needs_kajur_approval' => true,
            'is_available' => true,
        ]);

        $response = $this->actingAs($student)->post('/bookings', [
            'facility_id' => $facility->id,
            'start_time' => now()->addDay()->format('Y-m-d\TH:i'),
            'end_time' => now()->addDay()->addHours(2)->format('Y-m-d\TH:i'),
            'reason' => 'Praktikum',
            'attachment' => UploadedFile::fake()->create('surat.pdf', 100, 'application/pdf'),
        ]);

        $response->assertRedirect(route('bookings.history'));
        $booking = Booking::first();
        $this->assertNotNull($booking->attachment);
        Storage::disk('public')->assertExists($booking->attachment);

        $this->actingAs($admin)
            ->post(route('admin.bookings.update', $booking), ['status' => 'approved'])
            ->assertSessionHasNoErrors();

        $this->assertSame('approved', $booking->fresh()->status);
    }
}
