var BASE = 'https://ncc.vkes.co.id'


function loginPatient() {

  cy.visit(BASE + '/login')

  cy.get('input[type="email"]')
    .should('be.visible')
    .type('patient1@example.com')

  cy.get('input[type="password"]')
    .should('be.visible')
    .type('password')

  cy.contains('button', 'Masuk Ke Akun')
    .click({ force: true })

  cy.url({ timeout: 15000 })
    .should('not.include', '/login')
}


function bukaBeliPaket() {

  cy.contains('Beli Paket', { timeout: 10000 })
    .should('exist')
    .click({ force: true })

  cy.wait(1500)
}


function pilihPaket(namaPaket) {

  bukaBeliPaket()

  // Cari paket sesuai nama test case
  cy.contains(namaPaket, { timeout: 10000 })
    .should('exist')
    .scrollIntoView()

  // Cari container paket yang memiliki tombol Pilih Paket Ini
  cy.contains(namaPaket)
    .parents()
    .filter(function () {
      return Cypress.$(this)
        .find('button')
        .filter(function () {
          return Cypress.$(this)
            .text()
            .trim() === 'Pilih Paket Ini'
        })
        .length > 0
    })
    .first()
    .within(function () {

      cy.contains('button', 'Pilih Paket Ini')
        .click({ force: true })

    })

  cy.wait(500)

  // Popup konfirmasi
  cy.contains('Konfirmasi Pemilihan Paket', { timeout: 5000 })
    .should('exist')

  cy.contains('button', 'Ya, Lanjutkan')
    .click({ force: true })

  cy.wait(1500)

  // Pastikan sudah meninggalkan halaman daftar paket
  cy.url({ timeout: 10000 })
    .should('not.include', '/patient/packages')

  // Pastikan halaman pendaftaran paket terbuka
  cy.get('body')
    .should('be.visible')

  cy.get('body')
    .should('not.contain.text', '404 Not Found')

  cy.get('body')
    .should('not.contain.text', '500 Internal Server Error')
}


// ========================================
// NCC-PAT-PKG-001
// ========================================

it('NCC-PAT-PKG-001 - Select Konsultasi by RD Bronze Package', function () {

  loginPatient()

  pilihPaket('Konsultasi by RD Bronze')

})


// ========================================
// NCC-PAT-PKG-002
// ========================================

it('NCC-PAT-PKG-002 - Select BIA Inbody + Konsul Gold Package', function () {

  loginPatient()

  pilihPaket('BIA Inbody + Konsul Gold')

})


// ========================================
// NCC-PAT-PKG-003
// ========================================

it('NCC-PAT-PKG-003 - Select BIA Inbody + Konsul Silver Package', function () {

  loginPatient()

  pilihPaket('BIA Inbody + Konsul Silver')

})


// ========================================
// NCC-PAT-PKG-004
// ========================================

it('NCC-PAT-PKG-004 - Select BIA Inbody + Konsul Bronze Package', function () {

  loginPatient()

  pilihPaket('BIA Inbody + Konsul Bronze')

})


// ========================================
// NCC-PAT-PKG-005
// ========================================

it('NCC-PAT-PKG-005 - Select BIA Karada Scan + Konsul Basic Package', function () {

  loginPatient()

  pilihPaket('BIA Karada Scan + Konsul Basic')

})


// ========================================
// NCC-PAT-PKG-006
// ========================================

it('NCC-PAT-PKG-006 - Select AU + GD + Koles + HB Package', function () {

  loginPatient()

  pilihPaket('AU + GD + Koles + HB')

})


// ========================================
// NCC-PAT-PKG-007
// ========================================

it('NCC-PAT-PKG-007 - Select AU + GD + Koles Package', function () {

  loginPatient()

  pilihPaket('AU + GD + Koles')

})


// ========================================
// NCC-PAT-PKG-008
// ========================================

it('NCC-PAT-PKG-008 - Select Konsultasi by RD Gold Package', function () {

  loginPatient()

  pilihPaket('Konsultasi by RD Gold')

})


// ========================================
// NCC-PAT-PKG-009
// ========================================

it('NCC-PAT-PKG-009 - Select Konsultasi by RD Silver Package', function () {

  loginPatient()

  pilihPaket('Konsultasi by RD Silver')

})


// ========================================
// NCC-PAT-PKG-010
// ========================================

it('NCC-PAT-PKG-010 - Select BIA by Karada Scan Package', function () {

  loginPatient()

  pilihPaket('BIA by Karada Scan')

})


// ========================================
// NCC-PAT-PKG-011
// ========================================

it('NCC-PAT-PKG-011 - Select Konsultasi Basic by NF Package', function () {

  loginPatient()

  pilihPaket('Konsultasi Basic by NF')

})


// ========================================
// NCC-PAT-PKG-012
// ========================================

it('NCC-PAT-PKG-012 - Select Kolesterol Package', function () {

  loginPatient()

  pilihPaket('Kolestrol')

})


// ========================================
// NCC-PAT-PKG-013
// ========================================

it('NCC-PAT-PKG-013 - Select Hemoglobin HB Package', function () {

  loginPatient()

  pilihPaket('Hemoglobin')

})


// ========================================
// NCC-PAT-PKG-014
// ========================================

it('NCC-PAT-PKG-014 - Select Gula Darah GD Package', function () {

  loginPatient()

  pilihPaket('Gula Darah')

})


// ========================================
// NCC-PAT-PKG-015
// ========================================

it('NCC-PAT-PKG-015 - Select Asam Urat Package', function () {

  loginPatient()

  pilihPaket('Asam Urat')

})


// ========================================
// NCC-PAT-PKG-016
// ========================================

it('NCC-PAT-PKG-016 - Select Tensi Package', function () {

  loginPatient()

  pilihPaket('Tensi')

})


// ========================================
// NCC-PAT-PKG-017
// ========================================

it('NCC-PAT-PKG-017 - Select BIA by Inbody Package', function () {

  loginPatient()

  pilihPaket('BIA by Inbody')

})