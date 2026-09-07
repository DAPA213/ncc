describe('NCC Package Confirmation Popup', () => {

  beforeEach(() => {

    cy.visit('https://ncc.vkes.co.id/login')

    cy.get('input[type="email"]')
      .type('admin@example.com')

    cy.get('input[type="password"]')
      .type('password')

    cy.contains('button', 'Masuk Ke Akun')
      .click({ force: true })

    cy.url({ timeout: 10000 })
      .should('include', '/admin')

    cy.wait(1500)

    // Buka halaman paket
    cy.visit('https://ncc.vkes.co.id/officer/packages')

    cy.wait(1500)

    cy.get('body')
      .should('be.visible')
  })

    // NCC-PKG-POP-001
    it('NCC-PKG-POP-001 Verify Confirmation Popup Display After Selecting Package', () => {

    // Buka menu Pendaftaran Baru
    cy.contains('Pendaftaran Baru')
        .scrollIntoView()
        .click({ force: true })

    cy.wait(1000)

    // Klik salah satu paket
    cy.contains('Pilih Paket Ini')
        .first()
        .scrollIntoView()
        .click({ force: true })

    // Pastikan popup konfirmasi muncul
    cy.contains('Konfirmasi Pemilihan Paket')
        .should('be.visible')

    // Pastikan informasi paket tampil
    cy.contains('Anda akan memilih paket')
        .should('be.visible')

    // Pastikan tombol popup tersedia
    cy.contains('button', 'Batal')
        .should('exist')

    cy.contains('button', 'Ya, Lanjutkan')
        .should('exist')
    })
    // NCC-PKG-POP-002
    it('NCC-PKG-POP-002 Verify Cancel Button on Confirmation Popup', () => {

    cy.contains('Pilih Paket Ini')
        .filter(':visible')
        .first()
        .click({ force: true })

    cy.contains('Konfirmasi Pemilihan Paket')
        .should('be.visible')

    cy.contains('Batal')
        .click({ force: true })

    cy.wait(500)

    cy.contains('Konfirmasi Pemilihan Paket')
        .should('not.be.visible')
    })


  // NCC-PKG-POP-003
  it('NCC-PKG-POP-003 Verify Continue Button on Confirmation Popup', () => {

    cy.contains('Pilih Paket Ini')
      .first()
      .scrollIntoView()
      .click({ force: true })

    cy.contains('Konfirmasi Pemilihan Paket')
      .should('be.visible')

    cy.contains('Ya, Lanjutkan')
      .click({ force: true })

    cy.wait(1000)

    cy.url()
      .should('not.include', '/officer/packages')
  })


  // NCC-PKG-POP-004
  it('NCC-PKG-POP-004 Verify Package Information in Confirmation Popup', () => {

    cy.contains('Pilih Paket Ini')
      .first()
      .scrollIntoView()
      .click({ force: true })

    cy.contains('Konfirmasi Pemilihan Paket')
      .should('be.visible')

    cy.contains('Anda akan memilih paket')
      .should('exist')

    cy.contains('Anda akan diarahkan ke halaman')
      .should('exist')
  })


 
   // NCC-PKG-POP-005
    it('NCC-PKG-POP-005 Verify Popup Can Be Opened Multiple Times', () => {

    // 2. Buka menu Pendaftaran Baru
    cy.contains('Pendaftaran Baru')
        .scrollIntoView()
        .click({ force: true })

    cy.wait(1000)

    // 3. Klik Pilih Paket Ini
    cy.contains('Pilih Paket Ini')
        .filter(':visible')
        .first()
        .scrollIntoView()
        .click({ force: true })

    cy.wait(500)

    // Popup muncul
    cy.contains('Konfirmasi Pemilihan Paket')
        .should('be.visible')

    // 4. Klik Batal
    cy.contains('Batal')
        .click({ force: true })

    cy.wait(500)

    // Popup tertutup
    cy.contains('Konfirmasi Pemilihan Paket')
        .should('not.be.visible')

    // 5. Klik Pilih Paket Ini kembali
    cy.contains('Pilih Paket Ini')
        .first()
        .click({ force: true })

    cy.wait(500)

    // Popup muncul kembali
    cy.contains('Konfirmasi Pemilihan Paket')
        .should('be.visible')
    })
})
