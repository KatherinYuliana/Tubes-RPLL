import { mount } from '@vue/test-utils'
import Profile from './Profile.vue' // Ganti dengan nama file komponen Anda
import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { nextTick } from 'vue'

// Mock 'vue-router' dan 'axios'
const mockRouter = { push: vi.fn() }
vi.mock('vue-router', () => ({ useRouter: () => mockRouter }))
vi.mock('axios')

// Mock 'localStorage'
const localStorageMock = { getItem: vi.fn() };
vi.stubGlobal('localStorage', localStorageMock);


describe('Profile Page Component', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test untuk Path 1: Tidak ada token
  it('mengarahkan ke home jika tidak ada token', async () => {
    localStorageMock.getItem.mockReturnValue(null);
    mount(Profile);

    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });

  // Test untuk Path 2: Token valid, API sukses, dan conditional rendering
  it('menampilkan status loading lalu menampilkan data pengguna saat API sukses', async () => {
    localStorageMock.getItem.mockReturnValue('token-valid-123');
    const mockUser = {
      username: 'Andi',
      email: 'andi@email.com',
      image_profile: 'andi.png'
    };
    axios.get.mockResolvedValue({ data: mockUser });

    const wrapper = mount(Profile);

    // Verifikasi 1: Tampilan saat loading
    expect(wrapper.text()).toContain('Memuat data...');
    expect(wrapper.find('.profile-img').exists()).toBe(false); // Gambar belum ada

    await nextTick(); // Tunggu proses async dan DOM update

    // Verifikasi 2: Tampilan setelah data diterima
    expect(wrapper.text()).not.toContain('Memuat data...'); // Tulisan loading hilang
    expect(wrapper.text()).toContain('Nama: Andi');
    expect(wrapper.text()).toContain('Email: andi@email.com');
    const profileImg = wrapper.find('.profile-img');
    expect(profileImg.exists()).toBe(true); // Gambar profil sudah ada
    expect(profileImg.attributes('src')).toBe('/Profile Picture/andi.png');
  });

  // Test untuk Path 3: Token ada tapi API gagal
  it('mengarahkan ke home jika API gagal memvalidasi token', async () => {
    localStorageMock.getItem.mockReturnValue('token-tidak-valid');
    axios.get.mockRejectedValue(new Error('Unauthorized'));
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const wrapper = mount(Profile);

    expect(wrapper.text()).toContain('Memuat data...'); // Cek status loading awal

    await nextTick(); // Tunggu proses redirect

    expect(consoleSpy).toHaveBeenCalled(); // Pastikan error dicatat
    expect(mockRouter.push).toHaveBeenCalledWith('/');

    consoleSpy.mockRestore();
  });

  // Test Tambahan: Verifikasi Tombol
  it('menampilkan tombol Logout dan Edit Profile', () => {
    const wrapper = mount(Profile);

    // Test ini tidak peduli dengan data, hanya struktur tombol
    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBe(2);
    expect(buttons[0].text()).toBe('Logout');
    expect(buttons[1].text()).toBe('Edit Profile');
  });
});
