import { mount } from '@vue/test-utils'
import Navbar from './Navbar.vue' // Ganti dengan nama file komponen Anda
import { describe, it, expect } from 'vitest'

// Karena <router-link> adalah komponen global, kita perlu membuatnya
// menjadi komponen palsu (stub) agar tidak bergantung pada setup vue-router.
const RouterLinkStub = {
  name: 'RouterLink',
  template: '<a :href="to"><slot /></a>',
  props: ['to']
}

describe('Navbar Component', () => {

  // Test 1: Snapshot Testing untuk memastikan struktur UI tidak berubah
  it('merender dengan struktur HTML yang konsisten (snapshot)', () => {
    const wrapper = mount(Navbar, {
      global: {
        stubs: { 'router-link': RouterLinkStub }
      }
    });
    // Membuat atau membandingkan dengan snapshot yang ada
    expect(wrapper.html()).toMatchSnapshot();
  });

  // Test 2: Structural Testing untuk memverifikasi tujuan link
  it('memiliki link navigasi dengan tujuan (URL) yang benar', () => {
    const wrapper = mount(Navbar, {
      global: {
        stubs: { 'router-link': RouterLinkStub }
      }
    });

    // Cari semua komponen <router-link> yang sudah di-stub
    const links = wrapper.findAllComponents(RouterLinkStub);

    // Verifikasi tujuan dari setiap link
    expect(links[0].props('to')).toBe('/Home');
    expect(links[1].props('to')).toBe('/Search');
    expect(links[2].props('to')).toBe('/About');
    expect(links[3].props('to')).toBe('/Contact');
    expect(links[4].props('to')).toBe('/login');
  });

  // Test 3: Verifikasi keberadaan elemen penting
  it('menampilkan gambar logo', () => {
    const wrapper = mount(Navbar, {
        global: {
            stubs: { 'router-link': RouterLinkStub }
        }
    });

    const logo = wrapper.find('.logo img');
    expect(logo.exists()).toBe(true); // Pastikan elemen img ada
    expect(logo.attributes('alt')).toBe('Logo'); // Cek atribut alt-text
  });

});
