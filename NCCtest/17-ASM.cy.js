var BASE = 'https://ncc.vkes.co.id'

// ========================================
// LOGIN ADMIN
// ========================================
function loginAdmin() {
  cy.visit(BASE + '/login')

  cy.get('input[type="email"]', { timeout: 10000 })
    .should('be.visible')
    .clear()
    .type('admin@example.com')

  cy.get('input[type="password"]', { timeout: 10000 })
    .should('be.visible')
    .clear()
    .type('password')

  cy.contains('button', 'Masuk Ke Akun', { timeout: 10000 })
    .click({ force: true })

  cy.url({ timeout: 15000 })
    .should('include', '/admin')
}


// ========================================
// BUKA ASESMEN HARI INI
// ========================================
function bukaAsesmen() {
  cy.contains('Asesmen Hari Ini', { timeout: 15000 })
    .click({ force: true })

  cy.wait(1000)

  cy.get('body')
    .should('be.visible')
}


function filterTanggal(tanggal) {
  cy.get('input[type="date"]', { timeout: 10000 })
    .first()
    .clear()
    .type(tanggal)

  cy.contains('button', /^Filter$/i, { timeout: 10000 })
    .click({ force: true })

  cy.wait(1000)

  cy.get('tbody tr', { timeout: 10000 })
    .should('have.length.at.least', 1)
}



function klikTangani() {
  cy.contains('Tangani', { timeout: 10000 })
    .first()
    .click({ force: true })

  cy.wait(1000)
}



it('NCC-ASM-001 - Verify Display of Assessment List', () => {
  loginAdmin()
  bukaAsesmen()
  filterTanggal('2026-09-01')

  cy.get('table')
    .should('exist')

  cy.contains('Tanggal')
    .should('exist')

  cy.contains('Pasien')
    .should('exist')

  cy.contains('Paket')
    .should('exist')

  cy.contains('Status Data')
    .should('exist')

  cy.contains('Aksi')
    .should('exist')

  cy.contains('Tangani')
    .should('exist')
})



it('NCC-ASM-002 - Verify Status Data SUDAH DIISI', () => {
  loginAdmin()
  bukaAsesmen()
  filterTanggal('2026-09-01')

  cy.get('tbody')
    .invoke('text')
    .then((text) => {
      expect(text.toLowerCase())
        .to.include('sudah diisi')
    })
})



it('NCC-ASM-003 - Verify Assessment Data After Date Filter', () => {
  loginAdmin()
  bukaAsesmen()

  // Filter tanggal 04 September 2026
  cy.get('input[type="date"]', { timeout: 10000 })
    .first()
    .clear()
    .type('2026-09-04')

  cy.contains('button', /^Filter$/i, { timeout: 10000 })
    .click({ force: true })

  cy.wait(1000)

  // Pastikan data muncul
  cy.get('tbody tr', { timeout: 10000 })
    .should('have.length.at.least', 1)

  // Pastikan status sesuai dengan data
  cy.get('tbody')
    .invoke('text')
    .then((text) => {
      expect(text.toLowerCase())
        .to.include('sudah diisi')
    })
})


it('NCC-ASM-004 - Verify Status Data After Assessment Update', () => {
  loginAdmin()
  bukaAsesmen()

  // Filter tanggal 04 September 2026
  cy.get('input[type="date"]', { timeout: 10000 })
    .first()
    .clear()
    .type('2026-09-04')

  cy.contains('button', /^Filter$/i, { timeout: 10000 })
    .click({ force: true })

  cy.wait(1000)

  // Pastikan terdapat data
  cy.get('tbody tr', { timeout: 10000 })
    .should('have.length.at.least', 1)

  // Klik Tangani pada data yang tersedia
  cy.get('tbody tr')
    .first()
    .contains('Tangani')
    .click({ force: true })

  cy.wait(1000)

  // Pastikan halaman asesmen terbuka
  cy.contains('Simpan Data Asesmen', { timeout: 10000 })
    .should('exist')
})


// ========================================
// NCC-ASM-005
// Verify Handle Assessment Button
// Tanggal: 04 September 2026
// ========================================
it('NCC-ASM-005 - Verify Handle Assessment Button', () => {
  loginAdmin()
  bukaAsesmen()
  filterTanggal('2026-09-04')

  cy.contains('Tangani', { timeout: 10000 })
    .first()
    .should('exist')
    .click({ force: true })

  cy.wait(1000)

  cy.get('body')
    .should('be.visible')
})


it('NCC-ASM-006 - Verify Previous Record Information Display', () => {
  loginAdmin()
  bukaAsesmen()
  filterTanggal('2026-09-09')
  klikTangani()

  // Pastikan halaman form asesmen terbuka
  cy.get('body', { timeout: 10000 })
    .should('be.visible')

  // Pastikan terdapat data yang sudah terisi
  cy.get('input:visible', { timeout: 10000 })
    .filter(function () {
      const value = Cypress.$(this).val()
      return value !== null && value !== ''
    })
    .should('have.length.at.least', 1)

  // Pastikan tombol kembali tersedia
  cy.contains('Kembali ke Daftar', { timeout: 10000 })
    .should('exist')
    .click({ force: true })

  cy.wait(500)

  cy.get('body')
    .should('be.visible')
})



  // ========================================
  // NCC-ASM-007
  // Verify Assessment Klinis Form Display
  // ========================================
  it('NCC-ASM-007 - Verify Assessment Klinis Form Display', () => {
    loginAdmin()
    bukaAsesmen()
    filterTanggal('2026-09-09')
    klikTangani()

    // Pastikan form asesmen terbuka
    cy.get('body', { timeout: 10000 })
      .should('be.visible')

    // Field assessment klinis
    cy.contains('InBody Score', { timeout: 10000 })
      .should('exist')

    cy.contains('Berat Badan', { timeout: 10000 })
      .should('exist')

    cy.contains('Tinggi Badan', { timeout: 10000 })
      .should('exist')

    cy.contains('Lingkar Lengan Atas', { timeout: 10000 })
      .should('exist')

    cy.contains('Lingkar Perut', { timeout: 10000 })
      .should('exist')

    cy.contains('Hemoglobin', { timeout: 10000 })
      .should('exist')

    cy.contains('Gula Darah', { timeout: 10000 })
      .should('exist')

    cy.contains('Kolesterol', { timeout: 10000 })
      .should('exist')

    // Pastikan terdapat input upload file
    cy.get('input[type="file"]', { timeout: 10000 })
      .should('exist')
  })

  it('NCC-ASM-008 - Verify Upload InBody File', () => {
    loginAdmin()
    bukaAsesmen()
    filterTanggal('2026-09-09')
    klikTangani()

    cy.get('input[type="file"]', { timeout: 10000 })
      .should('exist')
      .and('have.attr', 'required')

    cy.contains('button', 'Simpan Data Asesmen', { timeout: 10000 })
      .click({ force: true })

    cy.get('input[type="file"]')
      .then(($input) => {
        expect($input[0].checkValidity()).to.be.false
      })
  })


// ========================================
// NCC-ASM-009
// Verify Numeric Input Validation
// Tanggal: 09 September 2026
// ========================================
it('NCC-ASM-009 - Verify Numeric Input Validation', () => {
  loginAdmin()
  bukaAsesmen()
  filterTanggal('2026-09-09')
  klikTangani()

  cy.get('input[type="number"]', { timeout: 10000 })
    .first()
    .should('exist')
    .type('abc')

  cy.get('input[type="number"]')
    .first()
    .invoke('val')
    .then((value) => {
      expect(value)
        .to.not.include('abc')
    })
})


// ========================================
// NCC-ASM-010
// Verify Empty Assessment Form Validation
// Tanggal: 09 September 2026
// ========================================
it('NCC-ASM-010 - Verify Empty Assessment Form Validation', () => {
  loginAdmin()
  bukaAsesmen()
  filterTanggal('2026-09-09')
  klikTangani()

  cy.contains('button', 'Simpan Data Asesmen', { timeout: 10000 })
    .click({ force: true })

  cy.wait(500)

  // Pastikan terdapat field yang wajib diisi
  cy.get('input[required], select[required], textarea[required]', {
    timeout: 10000
  })
    .should('have.length.at.least', 1)

  // Pastikan form tidak valid karena field wajib masih kosong
  cy.get('input[required], select[required], textarea[required]')
    .first()
    .then(($field) => {
      expect($field[0].checkValidity()).to.be.false
    })
})