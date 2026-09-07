describe('NCC Officer & Navigation Module', () => {

  it('NCC-OFC-DASH-001 View Dashboard Summary', () => {

    cy.visit('https://ncc.vkes.co.id/login')

    cy.get('input[type="email"]')
      .type('officer1@example.com')

    cy.get('input[type="password"]')
      .type('password')

    cy.contains('Masuk Ke Akun')
      .click()

    cy.get('body')
      .should('contain.text', 'Total Pasien')

    cy.get('body')
      .should('contain.text', 'Total Konselor')

    cy.get('body')
      .should('contain.text', 'Konsultasi')

  })

  it('NCC-OFC-DASH-002 View Latest Registration', () => {

    cy.visit('https://ncc.vkes.co.id/login')

    cy.get('input[type="email"]')
      .type('officer1@example.com')

    cy.get('input[type="password"]')
      .type('password')

    cy.contains('Masuk Ke Akun')
      .click()

    cy.get('body')
      .should('contain.text', 'Pendaftaran')

  })

  it('NCC-OFC-DASH-003 Verify Officer Access to Consultation List', () => {

    cy.visit('https://ncc.vkes.co.id/login')

    cy.get('input[type="email"]')
        .type('officer1@example.com')

    cy.get('input[type="password"]')
        .type('password')

    cy.contains('Masuk Ke Akun')
        .click()

    cy.url({ timeout: 15000 })
        .should('include', '/admin')

    cy.contains('Lihat Semua Konsultasi')
        .scrollIntoView()
        .click({ force: true })

    cy.url()
        .should('not.include', '/login')


  })

      it('NCC-OFC-CON-001 Register konsultasi as Officer', () => {

      cy.visit('https://ncc.vkes.co.id/login')

      cy.get('input[type="email"]')
        .type('officer1@example.com')
        
      cy.get('input[type="password"]')
        .type('password')
      
      cy.contains('Masuk Ke Akun')
        .click()

      cy.contains('Pendaftaran Baru')
        .click({ force: true })

      cy.contains('Pilih Paket Ini')
        .first()
        .click({ force: true })

      cy.contains('Ya, Lanjutkan')
        .click({ force: true })

      cy.url({ timeout: 10000 })
        .should('include', '/consultations/create')

      cy.contains('Pendaftaran Konsultasi Baru')
        .should('exist')

       // Pilih pasien
      cy.get('select')
        .eq(0)
        .select(1, { force: true })

      // Pilih konselor
      cy.get('select')
        .eq(1)
        .select('1', { force: true })
        
      // Isi tanggal
      cy.get('input[type="datetime-local"]')
        .type('2026-08-20T09:00')

      // Simpan
      cy.contains('Simpan Pendaftaran')
        .click({ force: true })

      cy.wait(3000)

      // Verifikasi tidak error
      cy.url().should('not.include', '/consultations/create')

      // atau cek halaman masih memuat data konsultasi
      cy.get('body')
        .should('contain.text', 'Konsultasi')
  })

  it('NCC-HOME-BTN-001 Verify Pelajari Selengkapnya Navigation', () => {

    cy.visit('https://ncc.vkes.co.id')

    cy.contains('Pelajari Selengkapnya')
      .click({ force: true })

    cy.url()
      .should('include', 'ncc.vkes.co.id')

  })

  it('NCC-REG-LINK-001 Verify Login Link Navigation', () => {

    cy.visit('https://ncc.vkes.co.id/register')

    cy.contains('Masuk')
      .click({ force: true })

    cy.url()
      .should('include', '/login')

  })

  it('NCC-SRCH-001 Verify Search Functionality', () => {

    cy.visit('https://ncc.vkes.co.id/login')

    cy.get('input[type="email"]')
      .type('admin@example.com')

    cy.get('input[type="password"]')
      .type('password')

    cy.contains('Masuk Ke Akun')
      .click()

    cy.url({ timeout: 15000 })
      .should('include', '/admin')

    cy.visit('https://ncc.vkes.co.id/admin/counselors')

    cy.get('input[type="search"], input[placeholder*="Cari"]')
      .first()
      .type('Counselor1')

    cy.wait(2000)

    cy.get('body')
      .should('contain.text', 'Counselor')

  })

})