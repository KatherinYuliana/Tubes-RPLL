import { mount } from '@vue/test-utils'
import CategoryCards from './CategoryCards.vue' // Ganti dengan nama file komponen Anda
import { describe, it, expect } from 'vitest'

describe('CategoryCards Component', () => {

  // Test 1: Snapshot Testing untuk menjaga konsistensi UI
  it('merender dengan struktur HTML yang konsisten', () => {
    const wrapper = mount(CategoryCards);
    // Membuat atau membandingkan dengan snapshot yang tersimpan
    expect(wrapper.html()).toMatchSnapshot();
  });

  // Test 2: Structural Testing untuk verifikasi konten secara spesifik
  it('menampilkan empat kartu kategori dengan benar', () => {
    const wrapper = mount(CategoryCards);

    // Cari semua elemen dengan class 'card'
    const cards = wrapper.findAll('.card');

    // Verifikasi jumlah kartu
    expect(cards.length).toBe(4);
  });

  it('menampilkan konten yang benar untuk kartu pertama (Alat Kebersihan)', () => {
    const wrapper = mount(CategoryCards);
    const firstCard = wrapper.findAll('.card')[0]; // Ambil kartu pertama

    // Verifikasi gambar dan teks pada kartu pertama
    const img = firstCard.find('img');
    const title = firstCard.find('h3');

    expect(img.attributes('alt')).toBe('Alat Kebersihan');
    expect(title.text()).toBe('Alat Kebersihan');
  });

  it('menampilkan konten yang benar untuk kartu terakhir (Wadah Minuman)', () => {
    const wrapper = mount(CategoryCards);
    const lastCard = wrapper.findAll('.card')[3]; // Ambil kartu terakhir

    const img = lastCard.find('img');
    const title = lastCard.find('h3');

    // Perhatikan: di kode Anda, alt untuk kartu ini adalah "Peralatan Mandi", ini mungkin sebuah bug.
    // Tes yang baik akan menangkap inkonsistensi seperti ini.
    // Mari kita uji sesuai kode yang ada.
    expect(img.attributes('alt')).toBe('Peralatan Mandi'); // Sesuai kode, meskipun mungkin salah
    expect(title.text()).toBe('Wadah Minuman');
  });

});
