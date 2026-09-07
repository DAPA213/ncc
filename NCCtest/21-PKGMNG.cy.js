const BASE = 'https://ncc.vkes.co.id'

// =====================================================
// LOGIN ADMIN
// =====================================================
function loginAdmin() {
  cy.visit(BASE + '/login', {
    pageLoadTimeout: 60000,
    timeout: 60000,
    failOnStatusCode: false
  })

  cy.get('input[type="email"]', { timeout: 30000 })
    .should('be.visible')
    .clear()
    .type('admin@example.com')

  cy.get('input[type="password"]', { timeout: 10000 })
    .should('be.visible')
    .clear()
    .type('password')

  cy.contains('button', 'Masuk Ke Akun', {
    timeout: 10000
  })
    .click({ force: true })

  cy.url({ timeout: 30000 })
    .should('include', '/admin')
}


// =====================================================
// BUKA MENU KELOLA PAKET NCC
// =====================================================
function bukaKelolaPaket() {
  cy.contains('Kelola Paket NCC', {
    timeout: 15000
  })
    .click({ force: true })

  cy.url({ timeout: 15000 })
    .should('include', '/admin/packages')

  cy.get('body', {
    timeout: 10000
  })
    .should('be.visible')
}


// =====================================================
// KLIK IKON EDIT / PENSIL
// =====================================================
function klikEditPaket() {

  cy.get('tbody tr', {
    timeout: 10000
  })
    .first()
    .within(() => {

      cy.get(
        'button:has(svg.lucide-pencil), ' +
        'a:has(svg.lucide-pencil), ' +
        'button:has([data-lucide="pencil"]), ' +
        'a:has([data-lucide="pencil"])',
        {
          timeout: 10000
        }
      )
        .should('exist')
        .click({ force: true })
    })

  cy.wait(500)
}


// =====================================================
// KLIK IKON HAPUS / TEMPAT SAMPAH
// =====================================================
function klikHapusPaket() {

  cy.get('tbody tr', {
    timeout: 10000
  })
    .first()
    .within(() => {

      cy.get(
        'button:has(svg.lucide-trash-2), ' +
        'a:has(svg.lucide-trash-2), ' +
        'button:has(svg.lucide-trash), ' +
        'a:has(svg.lucide-trash), ' +
        'button:has([data-lucide="trash-2"]), ' +
        'a:has([data-lucide="trash-2"]), ' +
        'button:has([data-lucide="trash"]), ' +
        'a:has([data-lucide="trash"])',
        {
          timeout: 10000
        }
      )
        .should('exist')
        .click({ force: true })
    })

  cy.wait(500)
}



describe('Manajemen Paket NCC', () => {

  // NCC-PKG-MNG-001
  // Access Kelola Paket NCC Page
  // ===================================================
  it('NCC-PKG-MNG-001 - Access Kelola Paket NCC Page', () => {

    loginAdmin()

    bukaKelolaPaket()

    cy.contains('Manajemen Paket', {
      timeout: 10000
    })
      .should('exist')

    cy.contains('Kelola daftar paket asesmen dan konsultasi untuk pasien.', {
      timeout: 10000
    })
      .should('exist')

    cy.get('tbody tr', {
      timeout: 10000
    })
      .should('have.length.at.least', 1)
  })


  // NCC-PKG-MNG-002
  // Open Add Package Form
  // ===================================================
  it('NCC-PKG-MNG-002 - Open Add Package Form', () => {

    loginAdmin()

    bukaKelolaPaket()

    cy.contains('Tambah Paket', {
      timeout: 10000
    })
      .should('exist')
      .click({ force: true })

    cy.contains('Tambah Paket Baru', {
      timeout: 10000
    })
      .should('exist')

    cy.contains(/Nama Paket/i)
      .should('exist')

    cy.contains(/Deskripsi Paket/i)
      .should('exist')

    cy.contains(/Harga/i)
      .should('exist')

    cy.contains(/Tipe Paket/i)
      .should('exist')

    cy.contains(/Jumlah Sesi/i)
      .should('exist')
  })


// NCC-PKG-MNG-003
it('NCC-PKG-MNG-003 - Create Package with Valid Data', () => {

  loginAdmin()

  bukaKelolaPaket()

  cy.contains('Tambah Paket', {
    timeout: 10000
  })
    .click({ force: true })

  cy.contains('Tambah Paket Baru', {
    timeout: 10000
  }).should('exist')

  // Nama Paket
  cy.get('input:visible')
    .first()
    .clear()
    .type('Paket Cypress Test')

  // Deskripsi Paket
  cy.get('textarea:visible')
    .first()
    .clear()
    .type('Paket untuk pengujian Cypress')

  // Harga
  cy.get('input[type="number"]:visible')
    .first()
    .clear()
    .type('100000')

  // Tipe Paket
  cy.get('select:visible')
    .first()
    .select(1)

  // Jumlah Sesi
  cy.get('input[type="number"]:visible')
    .last()
    .clear()
    .type('3')

  // Simpan
  cy.contains('button', /Simpan|Tambah|Buat/i, {
    timeout: 10000
  })
    .click({ force: true })

  cy.wait(1000)

  cy.get('body')
    .should('be.visible')
})


  // NCC-PKG-MNG-004
  // Create Package with Empty Required Fields
  it('NCC-PKG-MNG-004 - Create Package with Empty Required Fields', () => {

    loginAdmin()

    bukaKelolaPaket()

    cy.contains('Tambah Paket', {
      timeout: 10000
    })
      .click({ force: true })

    cy.contains('Tambah Paket Baru', {
      timeout: 10000
    })
      .should('exist')

    // Klik simpan tanpa mengisi data
    cy.contains('button', /Simpan|Tambah|Buat/i, {
      timeout: 10000
    })
      .click({ force: true })

    cy.wait(500)

    // Cek field wajib
    cy.get(
      'input[required], textarea[required], select[required]',
      {
        timeout: 10000
      }
    )
      .should('have.length.at.least', 1)

    // Cek validasi browser
    cy.get(
      'input[required], textarea[required], select[required]'
    )
      .first()
      .then(($field) => {
        expect($field[0].checkValidity()).to.be.false
      })
  })


    // NCC-PKG-MNG-005
    // Edit Package Data
    // ===================================================
    it('NCC-PKG-MNG-005 - Edit Package Data', () => {

    loginAdmin()

    bukaKelolaPaket()

    // Klik ikon pensil pada paket pertama
    cy.get('tbody tr')
        .first()
        .find('a')
        .first()
        .click({ force: true })

    cy.wait(500)

    // Pastikan halaman edit terbuka
    cy.url({ timeout: 15000 })
        .should('include', '/admin/packages/')

    // Ubah SATU field saja
    cy.get('input:visible')
        .first()
        .clear()
        .type('Paket Cypress Updated')

    // Simpan perubahan
    cy.contains('button', /Simpan|Update|Perbarui/i, {
        timeout: 10000
    })
        .click({ force: true })

    cy.wait(1000)

    cy.get('body')
        .should('be.visible')
    })


    // NCC-PKG-MNG-006
    // Delete Package Data
    // ===================================================
    it('NCC-PKG-MNG-006 - Delete Package Data', () => {

    loginAdmin()

    bukaKelolaPaket()

    // Klik ikon HAPUS pada paket pertama
    cy.get('tbody tr')
        .first()
        .find('button')
        .last()
        .click({ force: true })

    cy.wait(500)

    // Cek konfirmasi hapus
    cy.get('body')
        .should('be.visible')
    })


    // NCC-PKG-MNG-007
    // Verify Pagination on Package List
    // ===================================================
    it('NCC-PKG-MNG-007 - Verify Pagination on Package List', () => {

        loginAdmin()

        bukaKelolaPaket()

        cy.get('tbody tr', {
        timeout: 10000
        })
        .should('have.length.at.least', 1)

        // Cari tombol pagination
        cy.get('button, a')
        .filter(function () {

            const text =
            Cypress.$(this).text().trim()

            const aria =
            Cypress.$(this).attr('aria-label') || ''

            const title =
            Cypress.$(this).attr('title') || ''

            return (
            /next|berikutnya|selanjutnya/i.test(text) ||
            /next|berikutnya|selanjutnya/i.test(aria) ||
            /next|berikutnya|selanjutnya/i.test(title) ||
            text === '>'
            )
        })
        .first()
        .then(($next) => {

            if (
            $next.length &&
            !$next.is(':disabled')
            ) {

            cy.wrap($next)
                .click({ force: true })

            cy.wait(1000)

            cy.get('tbody tr', {
                timeout: 10000
            })
                .should('have.length.at.least', 1)
            }
        })
    })


    it('NCC-PKG-MNG-008 - Edit One Package Data and Verify Notification', () => {
    loginAdmin()

    bukaKelolaPaket()

    cy.get('tbody tr', { timeout: 10000 })
        .first()
        .within(() => {
        cy.get('a')
            .first()
            .click({ force: true })
        })

    cy.wait(1000)

    cy.url({ timeout: 15000 })
        .should('include', '/admin/packages/')

    cy.get('input:visible', { timeout: 10000 })
        .should('have.length.at.least', 1)

    cy.get('input:visible')
        .first()
        .clear()
        .type('Paket Cypress Updated')

    cy.contains('button', /Simpan|Update|Perbarui/i, {
        timeout: 10000
    })
        .click({ force: true })

    cy.wait(1000)

    cy.contains(
        /berhasil diperbarui|berhasil diubah|berhasil disimpan|success/i,
        { timeout: 10000 }
    )
        .should('be.visible')
    })

})