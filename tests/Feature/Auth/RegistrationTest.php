<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_new_users_can_register(): void
    {
        Storage::fake('public');

        $png1x1 = base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==');

        $response = $this->post('/register', [
            'name' => 'Test User',
            'npm' => '2215069999',
            'program_studi' => 'Teknik Elektro',
            'email' => 'test@example.com',
            'nomor_telepon' => '081234567890',
            'foto' => UploadedFile::fake()->createWithContent('ktm.png', $png1x1),
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertRedirect(route('login', absolute: false));

        $user = User::where('email', 'test@example.com')->first();

        $this->assertNotNull($user);
        $this->assertSame('2215069999', $user->npm);
        $this->assertFalse($user->status_aktif);
        $this->assertNotNull($user->foto);
        Storage::disk('public')->assertExists($user->foto);
        $this->assertGuest();
    }
}
