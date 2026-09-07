describe('NCC Dashboard & Patient Management', () => {

  beforeEach(() => {
    cy.visit('https://ncc.vkes.co.id/login')

    cy.get('input[type="email"]')
      .should('be.visible')
      .clear()
      .type('admin@example.com')

    cy.get('input[type="password"]')
      .should('be.visible')
      .clear()
      .type('password')

    cy.contains('Masuk Ke Akun').click()

    cy.url({ timeout: 20000 }).should('include', '/admin')
  })

  it('NCC-DAS-001 Dashboard after Login', () => {

    cy.url().should('include', '/admin')

    cy.get('body').should('contain.text', 'Dashboard')

    cy.contains('Kelola Pasien').should('exist')
    cy.contains('Kelola Konselor').should('exist')
    cy.contains('Kelola Petugas').should('exist')
    cy.contains('Kelola E-Leaflet').should('exist')
  })

  it('NCC-DAS-002 Overview page - Layanan NCC', () => {

    cy.url().should('include', '/admin')

    cy.get('body').should('contain.text', 'Dashboard')

    cy.get('body').should('contain.text', 'Pasien')
    cy.get('body').should('contain.text', 'Konselor')
  })

  it('NCC-PAS-001 Access Patient Management Page', () => {

      cy.visit('https://ncc.vkes.co.id/admin/patients')

      cy.contains('Daftar Pasien')
        .should('be.visible')

      cy.contains('Tambah Pasien')
        .should('be.visible')

      cy.contains('Nama Pasien')
        .should('be.visible')
    })

  it('NCC-PAS-002 Password Minimum Length Validation', () => {

    cy.visit('https://ncc.vkes.co.id/admin/patients/create')

    cy.get('input[placeholder*="RM"]')
      .type('RMTEST001')

    cy.get('input[placeholder*="Siti"]')
      .type('Cypress Test')

    cy.get('input[type="email"]')
      .type(`test${Date.now()}@gmail.com`)

    cy.get('input[type="password"]')
      .type('12345')

    cy.get('input[placeholder*="812"]')
      .type('081234567890')

    cy.get('textarea')
      .type('Alamat Testing Cypress')

    cy.contains('Simpan Data Pasien').click()

    cy.url().should('include', '/patients/create')
  })


  it('NCC-PAS-003 Edit Patient Data', () => {

    cy.visit('https://ncc.vkes.co.id/admin/patients')

    cy.get('a[href*="/edit"]')
      .first()
      .click()

    cy.url().should('include', '/edit')

    // lihat semua input yang terlihat
    cy.get('input:visible').then(($el) => {
      cy.log('Jumlah input visible: ' + $el.length)
    })

    cy.get('input:visible')
    .eq(2)
    .clear()
    .type('Patient Cypress Update')

  cy.contains('Simpan Data Pasien').click()

  })

})