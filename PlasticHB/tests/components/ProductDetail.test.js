import { mount } from '@vue/test-utils'
import Navbar from './Navbar.vue' // Ganti dengan nama file komponen Anda
import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { nextTick } from 'vue'

// Mock 'vue-router'
const mockRouter = { push: vi.fn() }
vi.mock('vue-router', () => ({ useRouter: () => mockRouter }))

// Mock 'axios'
vi.mock('axios')

// Mock 'localStorage'
const localStorageMock = {
  getItem: vi.fn(),
};
vi.stubGlobal('localStorage', localStorageMock);


describe('Navbar Component', () => {

  beforeEach(() => {
    // Reset semua mock sebelum setiap test
    vi.clearAllMocks();
  });

  // Test untuk Path 1: Tidak ada token
  it('mengarahkan ke home jika tidak ada token di localStorage', async () => {
    localStorageMock.getItem.mockReturnValue(null);
    mount(Navbar);

    expect(mockRouter.push).toHaveBeenCalledWith('/');
    expect(axios.get).not.toHaveBeenCalled(); // API tidak boleh dipanggil
  });

  // Test untuk Path 2: Token valid dan API sukses
  it('mengambil data pengguna dan menampilkannya jika token valid', async () => {
    localStorageMock.getItem.mockReturnValue('token-valid-123');
    const mockUser = { username: 'Budi', image_profile: 'budi.jpg' };
    axios.get.mockResolvedValue({ data: mockUser });

    const wrapper = mount(Navbar);
    await nextTick(); // Tunggu Vue memperbarui DOM

    expect(axios.get).toHaveBeenCalledWith(
      'http://localhost:3000/api/users/profile',
      expect.any(Object)
    );
    expect(mockRouter.push).not.toHaveBeenCalled(); // Tidak boleh redirect
    const profileImg = wrapper.find('.pp img');
    expect(profileImg.exists()).toBe(true); // Gambar profil harus ada
    expect(profileImg.attributes('src')).toBe('/Profile Picture/budi.jpg');
  });

  // Test untuk Path 3: Token ada tapi API gagal
  it('mengarahkan ke home jika API gagal memvalidasi token', async () => {
    localStorageMock.getItem.mockReturnValue('token-tidak-valid');
    axios.get.mockRejectedValue(new Error('Unauthorized'));
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    mount(Navbar);
    await nextTick();

    expect(consoleSpy).toHaveBeenCalled(); // Pastikan error dicatat
    expect(mockRouter.push).toHaveBeenCalledWith('/'); // Harus redirect

    consoleSpy.mockRestore();
  });
});
