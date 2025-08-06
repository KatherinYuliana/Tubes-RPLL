import { mount } from '@vue/test-utils';
import ContactForm from './ContactForm.vue'; // Impor komponen Anda
import { describe, it, expect, vi } from 'vitest';

describe('ContactForm', () => {

  // Test untuk Path 1: Pengiriman Sukses
  it('mengirimkan data dan mereset form ketika semua field diisi', async () => {
    const wrapper = mount(ContactForm);
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    // Mengisi semua data input
    await wrapper.setData({
      nama: 'Budi Santoso',
      email: 'budi@email.com',
      pesan: 'Testing pengiriman sukses'
    });

    // Memicu submit pada form
    await wrapper.find('form').trigger('submit');

    // Verifikasi
    expect(alertSpy).toHaveBeenCalledWith('Pesan berhasil dikirim! (Cek console log)');
    expect(wrapper.vm.nama).toBe(''); // Pastikan nama direset
    expect(wrapper.vm.email).toBe(''); // Pastikan email direset
    expect(wrapper.vm.pesan).toBe(''); // Pastikan pesan direset

    alertSpy.mockRestore();
  });

  // Test untuk Path 2: Pengiriman Gagal
  it('menampilkan error dan tidak mereset form jika ada field yang kosong', async () => {
    const wrapper = mount(ContactForm);
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    // Mengisi data tapi mengosongkan email
    await wrapper.setData({
      nama: 'Budi Santoso',
      email: '', // Email sengaja dikosongkan
      pesan: 'Testing pengiriman gagal'
    });

    // Memicu submit pada form
    await wrapper.find('form').trigger('submit');

    // Verifikasi
    expect(alertSpy).toHaveBeenCalledWith('Harap isi semua kolom.');
    expect(wrapper.vm.nama).toBe('Budi Santoso'); // Pastikan data tidak hilang
    expect(wrapper.vm.pesan).toBe('Testing pengiriman gagal'); // Pastikan data tidak hilang

    alertSpy.mockRestore();
  });
});
