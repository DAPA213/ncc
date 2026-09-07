var BASE = 'https://ncc.vkes.co.id'

function loginAdmin() {
  cy.visit(BASE + '/login')

  cy.get('input[type="email"]')
    .should('be.visible')
    .type('admin@example.com')

  cy.get('input[type="password"]')
    .should('be.visible')
    .type('password')

  cy.contains('button', 'Masuk Ke Akun')
    .click({ force: true })

  cy.url({ timeout: 15000 })
    .should('include', '/admin')
}


function bukaPendaftaran() {
  cy.contains('Pendaftaran Baru', { timeout: 10000 })
    .should('exist')
    .click({ force: true })

  cy.wait(1500)
}


function pilihPaket(namaPaket) {

  bukaPendaftaran()

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
    .should('not.include', '/admin/packages')

  // Cek elemen form pendaftaran
  cy.get('body')
    .should('be.visible')

  cy.get('body')
    .should('contain.text', 'Pilih Paket')

  cy.get('body')
    .should('not.contain.text', '404 Not Found')

  cy.get('body')
    .should('not.contain.text', '500 Internal Server Error')
}



// NCC-REG-PKG-001

it('NCC-REG-PKG-001 - Select Konsultasi by RD Bronze Package', function () {

  loginAdmin()

  pilihPaket('Konsultasi by RD Bronze')

})


// ========================================
// NCC-REG-PKG-002
// ========================================

it('NCC-REG-PKG-002 - Select BIA Inbody + Konsul Gold Package', function () {

  loginAdmin()

  pilihPaket('BIA Inbody + Konsul Gold')

})

// NCC-REG-PKG-003

it('NCC-REG-PKG-003 - Select BIA Inbody + Konsul Silver Package', function () {

  loginAdmin()

  pilihPaket('BIA Inbody + Konsul Silver')

})


// NCC-REG-PKG-004

it('NCC-REG-PKG-004 - Select BIA Inbody + Konsul Bronze Package', function () {

  loginAdmin()

  pilihPaket('BIA Inbody + Konsul Bronze')

})


// NCC-REG-PKG-005

it('NCC-REG-PKG-005 - Select BIA Karada Scan + Konsul Basic Package', function () {

  loginAdmin()

  pilihPaket('BIA Karada Scan + Konsul Basic')

})


// NCC-REG-PKG-006

it('NCC-REG-PKG-006 - Select AU + GD + Koles + HB Package', function () {

  loginAdmin()

  pilihPaket('AU + GD + Koles + HB')

})


// NCC-REG-PKG-007

it('NCC-REG-PKG-007 - Select AU + GD + Koles Package', function () {

  loginAdmin()

  pilihPaket('AU + GD + Koles')

})


// NCC-REG-PKG-008

it('NCC-REG-PKG-008 - Select Konsultasi by RD Gold Package', function () {

  loginAdmin()

  pilihPaket('Konsultasi by RD Gold')

})


// NCC-REG-PKG-009

it('NCC-REG-PKG-009 - Select Konsultasi by RD Silver Package', function () {

  loginAdmin()

  pilihPaket('Konsultasi by RD Silver')

})


// NCC-REG-PKG-010

it('NCC-REG-PKG-010 - Select BIA by Karada Scan Package', function () {

  loginAdmin()

  pilihPaket('BIA by Karada Scan')

})

// NCC-REG-PKG-011

it('NCC-REG-PKG-011 - Select Konsultasi Basic by NF Package', function () {

  loginAdmin()

  pilihPaket('Konsultasi Basic by NF')

})


// NCC-REG-PKG-012

it('NCC-REG-PKG-012 - Select Kolesterol Package', function () {

  loginAdmin()

  pilihPaket('Kolestrol')

})


// NCC-REG-PKG-013

it('NCC-REG-PKG-013 - Select Hemoglobin HB Package', function () {

  loginAdmin()

  pilihPaket('Hemoglobin')

})


// NCC-REG-PKG-014

it('NCC-REG-PKG-014 - Select Gula Darah GD Package', function () {

  loginAdmin()

  pilihPaket('Gula Darah')

})


// NCC-REG-PKG-015

it('NCC-REG-PKG-015 - Select Asam Urat Package', function () {

  loginAdmin()

  pilihPaket('Asam Urat')

})


// NCC-REG-PKG-016

it('NCC-REG-PKG-016 - Select Tensi Package', function () {

  loginAdmin()

  pilihPaket('Tensi')

})


// NCC-REG-PKG-017

it('NCC-REG-PKG-017 - Select BIA by Inbody Package', function () {

  loginAdmin()

  pilihPaket('BIA by Inbody')

})