import { mount } from '@vue/test-utils'
import ProductGallery from './ProductGallery.vue' // Ganti dengan nama file komponen Anda
import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { nextTick } from 'vue'

// Mock 'vue-router'
// Kita buat router palsu dengan fungsi 'push' yang bisa kita mata-matai
const mockRouter = {
  push: vi.fn()
}
vi.mock('vue-router', () => ({
  useRouter: () => mockRouter
}))

// Mock 'axios'
vi.mock('axios')

describe('ProductGallery', () => {

  beforeEach(() => {
    // Reset mock sebelum setiap test
    mockRouter.push.mockClear();
    axios.get.mockClear();
  });

  // Test untuk onMounted - Jalur Sukses
  it('mengambil dan menampilkan data produk saat komponen di-mount', async () => {
    const mockProducts = [
      { id_product: 1, name_product: 'Ember Plastik', image_url: 'ember.jpg' },
      { id_product: 2, name_product: 'Botol Minum', image_url: 'botol.jpg' }
    ];
    // Atur axios.get untuk mengembalikan data sukses
    axios.get.mockResolvedValue({ data: mockProducts });

    const wrapper = mount(ProductGallery);
    await nextTick(); // Tunggu Vue memperbarui DOM setelah data diterima

    const productElements = wrapper.findAll('.product');
    expect(productElements.length).toBe(2); // Harapannya ada 2 produk yang dirender
    expect(wrapper.text()).toContain('Ember Plastik'); // Cek apakah nama produk ada
  });

  // Test untuk onMounted - Jalur Gagal
  it('mencatat error ketika pengambilan data API gagal', async () => {
    // Atur axios.get untuk mengembalikan error
    axios.get.mockRejectedValue(new Error('Network Error'));
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    mount(ProductGallery);
    await nextTick();

    expect(consoleSpy).toHaveBeenCalledWith("Gagal ambil produk:", expect.any(Error));
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    consoleSpy.mockRestore();
  });

  // Test untuk goToDetail - Jalur Navigasi
  it('memanggil router.push dengan ID yang benar saat produk diklik', async () => {
    const mockProducts = [
      { id_product: 5, name_product: 'Kursi Plastik', image_url: 'kursi.jpg' }
    ];
    axios.get.mockResolvedValue({ data: mockProducts });

    const wrapper = mount(ProductGallery);
    await nextTick();

    // Memicu klik pada elemen produk pertama
    await wrapper.find('.product').trigger('click');

    expect(mockRouter.push).toHaveBeenCalledTimes(1); // Pastikan push dipanggil
    expect(mockRouter.push).toHaveBeenCalledWith('/products/detail/5'); // Pastikan URL-nya benar
  });
});
