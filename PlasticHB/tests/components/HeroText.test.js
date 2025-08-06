import { mount } from '@vue/test-utils'
import HeroComponent from './HeroComponent.vue' // Impor komponen Anda
import { describe, it, expect, vi } from 'vitest'

// Mocking <router-link> agar tidak bergantung pada setup vue-router
const RouterLinkStub = {
  template: '<a :href="to"><slot /></a>',
  props: ['to']
}

describe('HeroComponent', () => {

  // Test untuk Path 1: Tanpa Tombol CTA
  it('hanya menampilkan judul dan subjudul jika ctaText tidak ada', () => {
    const wrapper = mount(HeroComponent, {
      props: { title: 'Selamat Datang', subtitle: 'Ini adalah subtitle' }
    });

    expect(wrapper.find('h1').text()).toBe('Selamat Datang');
    expect(wrapper.find('h3').text()).toBe('Ini adalah subtitle');
    // Pastikan tidak ada button atau link CTA
    expect(wrapper.find('button').exists()).toBe(false);
    expect(wrapper.find('.cta-button').exists()).toBe(false);
  });

  // Test untuk Path 2: Menampilkan Button
  it('menampilkan button dan memicu onClick saat diklik', async () => {
    const onClickMock = vi.fn(); // Buat fungsi palsu untuk dimata-matai

    const wrapper = mount(HeroComponent, {
      props: {
        title: 'Aksi',
        subtitle: 'Lakukan sesuatu',
        ctaText: 'Jalankan Fungsi',
        onClick: onClickMock
      }
    });

    // Pastikan button ada dan link tidak ada
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Jalankan Fungsi');
    expect(wrapper.find('.cta-button').exists()).toBe(false);

    // Aksi: Klik tombol
    await button.trigger('click');

    // Verifikasi: Fungsi onClick dipanggil
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  // Test untuk Path 3: Menampilkan Router-Link
  it('menampilkan router-link dengan tujuan yang benar', () => {
    const wrapper = mount(HeroComponent, {
      props: {
        title: 'Navigasi',
        subtitle: 'Pindah halaman',
        ctaText: 'Pergi ke Produk',
        ctaTo: '/produk-plastik'
      },
      global: {
        stubs: { // Ganti <router-link> asli dengan stub palsu kita
          'router-link': RouterLinkStub
        }
      }
    });

    // Pastikan link ada dan button tidak ada
    const link = wrapper.find('.cta-button');
    expect(link.exists()).toBe(true);
    expect(link.text()).toBe('Pergi ke Produk');
    expect(wrapper.find('button').exists()).toBe(false);

    // Verifikasi: Atribut 'href' pada link sesuai dengan prop 'ctaTo'
    expect(link.attributes('href')).toBe('/produk-plastik');
  });
});
