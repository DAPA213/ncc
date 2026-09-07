describe('NCC NLK, E-Leaflet, Checkbox, Consultation Module', () => {

  beforeEach(() => {
    cy.visit('https://ncc.vkes.co.id/login')

    cy.get('input[type="email"]')
      .type('admin@example.com')

    cy.get('input[type="password"]')
      .type('password')

    cy.contains('Masuk Ke Akun')
      .click()

    cy.url({ timeout: 15000 })
      .should('include', '/admin')
  })

  it('NCC-NLK-006 Input Additional Notes in Transfer Record', () => {

    cy.contains('Rekonsiliasi Dana NLK')
      .click({ force: true })

    cy.contains('Rekam Transfer')
      .click({ force: true })

    cy.get('input[type="number"]')
      .first()
      .type('100000')

    cy.get('input[type="date"]')
      .type('2026-08-20')

    cy.get('textarea')
      .type('Transfer untuk periode Agustus')

    cy.contains('Simpan')
      .click({ force: true })

    cy.get('body')
      .should('contain.text', 'Transfer')
  })

  it('NCC-NLK-007 Save Transfer Record Without Additional Notes', () => {

    cy.contains('Rekonsiliasi Dana NLK')
      .click({ force: true })

    cy.contains('Rekam Transfer')
      .click({ force: true })

    cy.get('input[type="number"]')
      .first()
      .type('100000')

    cy.get('input[type="date"]')
      .type('2026-08-20')

    cy.contains('Simpan')
      .click({ force: true })

    cy.get('body')
      .should('contain.text', 'Transfer')
  })

  it('NCC-ELF-005 View E-Leaflet List', () => {

    cy.contains('Kelola E-Leaflet')
      .click({ force: true })

    cy.contains('Tambah')
      .should('exist')

    cy.get('table')
      .should('exist')
  })

    it('NCC-ELF-006 Delete E-Leaflet Data', () => {

    cy.contains('Kelola E-Leaflet')
        .click({ force: true })

    // Klik ikon hapus pada baris pertama
    cy.get('table tbody tr')
        .first()
        .find('button')
        .last()
        .click({ force: true })

    cy.wait(1000)

    // Konfirmasi hapus
    cy.get('button.bg-rose-500')
        .click({ force: true })

    cy.wait(2000)

    cy.get('body')
        .should('be.visible')
  })

    it('NCC-ELF-007 Edit E-Leaflet', () => {

        cy.contains('Kelola E-Leaflet')
            .click({ force: true })

        cy.get('a[href*="/edit"]')
            .first()
            .click({ force: true })

        // Edit Nama Leaflet saja
        cy.get('input:not([type="hidden"]):not([type="file"])')
            .first()
            .clear({ force: true })
            .type('Leaflet Update Cypress', { force: true })

        cy.contains('Perbarui Leaflet')
            .click({ force: true })

        cy.wait(2000)

        cy.get('body')
            .should('contain.text', 'Leaflet')
        })


  it('NCC-CBX-002 Verify Checkbox Functionality on Officer Management', () => {

    cy.contains('Kelola Petugas')
      .click({ force: true })

    cy.get('input[type="checkbox"]')
      .eq(1)
      .check({ force: true })

    cy.get('input[type="checkbox"]')
      .eq(1)
      .should('be.checked')

    cy.get('input[type="checkbox"]')
      .eq(1)
      .uncheck({ force: true })

    cy.get('input[type="checkbox"]')
      .eq(1)
      .should('not.be.checked')
  })

  it('NCC-CBX-003 Verify Checkbox Functionality on Counselor Management', () => {

    cy.contains('Kelola Konselor')
      .click({ force: true })

    cy.get('input[type="checkbox"]')
      .eq(1)
      .check({ force: true })

    cy.get('input[type="checkbox"]')
      .eq(1)
      .should('be.checked')

    cy.get('input[type="checkbox"]')
      .eq(1)
      .uncheck({ force: true })

    cy.get('input[type="checkbox"]')
      .eq(1)
      .should('not.be.checked')
  })

    it('NCC-CNS-005 View Consultation Detail', () => {

    cy.contains('Riwayat Medis Pasien')
        .click({ force: true })

    cy.get('table tbody tr')
        .first()
        .find('a,button')
        .eq(0)
        .click({ force: true })

    cy.get('body')
        .should('contain.text', 'Konsultasi')
 })

    it('NCC-CNS-006 Navigate Consultation History Pagination', () => {

    cy.contains('Riwayat Medis Pasien')
        .click({ force: true })

    cy.url()
        .should('include', '/consultations')

    // Pindah ke halaman 2
    cy.contains('2')
        .click({ force: true })

    cy.wait(2000)

    cy.get('body')
        .should('contain.text', 'Konsultasi')

    // Pindah ke halaman 3
    cy.contains('3')
        .click({ force: true })

    cy.wait(2000)

    cy.get('body')
        .should('contain.text', 'Konsultasi')

    // Kembali ke halaman 2
    cy.contains('2')
        .click({ force: true })

    cy.wait(2000)

    cy.get('body')
        .should('contain.text', 'Konsultasi')

    })

  })
