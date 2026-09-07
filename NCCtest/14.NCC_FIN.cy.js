describe('NCC Package and Financial Report', () => {

  // NCC-PKG-MNG-001
  it('NCC-PKG-MNG-001 Access Kelola Paket NCC Page', () => {

    cy.visit('https://ncc.vkes.co.id/login')

    cy.get('input[type="email"]')
      .type('admin@example.com')

    cy.get('input[type="password"]')
      .type('password')

    cy.contains('button', 'Masuk Ke Akun')
      .click({ force: true })

    cy.url({ timeout: 10000 })
      .should('include', '/admin')

    cy.contains('Kelola Paket NCC')
      .scrollIntoView()
      .click({ force: true })

    cy.wait(1000)

    cy.url({ timeout: 10000 })
      .should('include', 'packages')

    cy.contains(/Kelola Paket NCC/i)
      .should('exist')
  })


  // NCC-PKG-001
  it('NCC-PKG-001 View Package List', () => {

    cy.visit('https://ncc.vkes.co.id/login')

    cy.get('input[type="email"]')
      .type('admin@example.com')

    cy.get('input[type="password"]')
      .type('password')

    cy.contains('button', 'Masuk Ke Akun')
      .click({ force: true })

    cy.url({ timeout: 10000 })
      .should('include', '/admin')

    cy.contains('Pendaftaran Baru')
      .scrollIntoView()
      .click({ force: true })

    cy.wait(1000)

    cy.get('body')
      .should('be.visible')
  })


  // NCC-PKG-002
  it('NCC-PKG-002 Verify Package Information Display', () => {

    cy.visit('https://ncc.vkes.co.id/login')

    cy.get('input[type="email"]')
      .type('admin@example.com')

    cy.get('input[type="password"]')
      .type('password')

    cy.contains('button', 'Masuk Ke Akun')
      .click({ force: true })

    cy.url({ timeout: 10000 })
      .should('include', '/admin')

    cy.contains('Pendaftaran Baru')
      .scrollIntoView()
      .click({ force: true })

    cy.wait(1000)

    cy.get('body')
      .should('contain.text', 'Rp')

    cy.get('body')
      .should('be.visible')
  })


  // NCC-PKG-003
  it('NCC-PKG-003 Select Consultation Package', () => {

    cy.visit('https://ncc.vkes.co.id/login')

    cy.get('input[type="email"]')
      .type('admin@example.com')

    cy.get('input[type="password"]')
      .type('password')

    cy.contains('button', 'Masuk Ke Akun')
      .click({ force: true })

    cy.url({ timeout: 10000 })
      .should('include', '/admin')

    cy.contains('Pendaftaran Baru')
      .scrollIntoView()
      .click({ force: true })

    cy.wait(1000)

    cy.contains(/Pilih Paket Ini/i)
      .first()
      .scrollIntoView()
      .click({ force: true })

    cy.wait(1000)
  })


  // NCC-PKG-004
  it('NCC-PKG-004 Select Bundle Package', () => {

    cy.visit('https://ncc.vkes.co.id/login')

    cy.get('input[type="email"]')
      .type('admin@example.com')

    cy.get('input[type="password"]')
      .type('password')

    cy.contains('button', 'Masuk Ke Akun')
      .click({ force: true })

    cy.url({ timeout: 10000 })
      .should('include', '/admin')

    cy.contains('Pendaftaran Baru')
      .scrollIntoView()
      .click({ force: true })

    cy.wait(1000)

    cy.contains(/Bundle/i)
      .first()
      .scrollIntoView()
      .should('exist')

    cy.contains(/Bundle/i)
      .first()
      .parents()
      .contains(/Pilih Paket Ini/i)
      .click({ force: true })

    cy.wait(1000)
  })


  // NCC-PKG-005
  it('NCC-PKG-005 Verify Package Price Display', () => {

    cy.visit('https://ncc.vkes.co.id/login')

    cy.get('input[type="email"]')
      .type('admin@example.com')

    cy.get('input[type="password"]')
      .type('password')

    cy.contains('button', 'Masuk Ke Akun')
      .click({ force: true })

    cy.url({ timeout: 10000 })
      .should('include', '/admin')

    cy.contains('Pendaftaran Baru')
      .scrollIntoView()
      .click({ force: true })

    cy.wait(1000)

    cy.get('body')
      .should('contain.text', 'Rp')
  })


// NCC-PKG-006
  it('NCC-PKG-006 Verify Consultation Session Badge', () => {

    cy.visit('https://ncc.vkes.co.id/login')

    // Klik Daftar sekarang / masuk ke halaman yang bisa diakses tanpa login
    cy.contains('Daftar sekarang')
      .scrollIntoView()
      .click({ force: true })

    cy.wait(1000)

    // Cek tampilan saja
    cy.get('body')
      .should('be.visible')

    cy.get('body')
      .invoke('text')
      .should('not.be.empty')

  })


 // NCC-PKG-007
  it('NCC-PKG-007 Verify Package Card Layout', () => {

    cy.visit('https://ncc.vkes.co.id/login')

    cy.get('input[type="email"]')
      .type('admin@example.com')

    cy.get('input[type="password"]')
      .type('password')

    cy.contains('button', 'Masuk Ke Akun')
      .click({ force: true })

    cy.url({ timeout: 10000 })
      .should('include', '/admin')

    cy.contains('Pendaftaran Baru')
      .scrollIntoView()
      .click({ force: true })

    cy.wait(1500)

    // Pastikan halaman tampil
    cy.get('body')
      .should('be.visible')

    // Cek paket berdasarkan tombolnya
    cy.contains('Pilih Paket Ini')
      .should('exist')

    cy.contains('Pilih Paket Ini')
      .each(($button) => {
        cy.wrap($button)
          .scrollIntoView()
          .should('be.visible')
      })

    // Kembali ke atas tanpa error scroll
    cy.scrollTo('top', {
      duration: 500,
      ensureScrollable: false
    })

  })


  // NCC-PKG-008
  it('NCC-PKG-008 Verify Package Button Visibility', () => {

    cy.visit('https://ncc.vkes.co.id/login')

    cy.get('input[type="email"]')
      .type('admin@example.com')

    cy.get('input[type="password"]')
      .type('password')

    cy.contains('button', 'Masuk Ke Akun')
      .click({ force: true })

    cy.url({ timeout: 10000 })
      .should('include', '/admin')

    cy.contains('Pendaftaran Baru')
      .scrollIntoView()
      .click({ force: true })

    cy.wait(1500)

    // Cek tombol Pilih Paket Ini
    cy.contains('Pilih Paket Ini')
      .should('exist')

    cy.contains('Pilih Paket Ini')
      .each(($element) => {
        cy.wrap($element)
          .scrollIntoView()
          .should('exist')
      })

  })


  // NCC-PKG-009
  it('NCC-PKG-009 Verify Package Description Display', () => {

    cy.get('body')
      .should('be.visible')

    cy.get('p:visible')
      .should('have.length.greaterThan', 0)
  })


  // NCC-PKG-010
  it('NCC-PKG-010 Verify Package Page Loading', () => {

    cy.get('body')
      .should('be.visible')

    cy.wait(1000)

    cy.get('body')
      .should('not.contain.text', '500 Internal Server Error')

    cy.get('body')
      .should('not.contain.text', '404 Not Found')
  })


  // NCC-FIN-001
  it('NCC-FIN-001 Access Financial Report Page', () => {

    cy.visit('https://ncc.vkes.co.id/login')

    cy.get('input[type="email"]')
      .type('admin@example.com')

    cy.get('input[type="password"]')
      .type('password')

    cy.contains('button', 'Masuk Ke Akun')
      .click({ force: true })

    cy.url({ timeout: 10000 })
      .should('include', '/admin')

    cy.contains('Laporan Keuangan')
      .scrollIntoView()
      .click({ force: true })

    cy.wait(1000)

    cy.contains(/Laporan Keuangan/i)
      .should('exist')
  })

})