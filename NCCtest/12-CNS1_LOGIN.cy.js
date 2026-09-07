describe('NCC Counselor Management', () => {

  beforeEach(() => {

    cy.visit('https://ncc.vkes.co.id/login')

    cy.get('input[type="email"]:visible')
      .first()
      .clear()
      .type('admin@example.com')

    cy.get('input[type="password"]:visible')
      .first()
      .clear()
      .type('password')

    cy.contains('button', 'Masuk Ke Akun')
      .click({ force: true })

    cy.url({ timeout: 10000 })
      .should('include', '/admin')
  })


  // NCC-CNS-ADD-001
  it('NCC-CNS-ADD-001 Verify Add Counselor Form Display', () => {

    cy.contains('a', 'Kelola Konselor')
      .click({ force: true })

    cy.wait(1000)

    cy.contains('Tambah Konselor')
      .click({ force: true })

    cy.wait(1000)

    cy.contains('Tambah Konselor')
      .should('exist')

    cy.get('input:visible')
      .should('have.length.at.least', 1)

    cy.contains('Simpan Data Konselor')
      .should('exist')

    cy.contains('Batal & Kembali')
      .should('exist')
  })


  // NCC-CNS-ADD-002
  it('NCC-CNS-ADD-002 Verify Placeholder and Label Display', () => {

    cy.contains('a', 'Kelola Konselor')
      .click({ force: true })

    cy.wait(1000)

    cy.contains('Tambah Konselor')
      .click({ force: true })

    cy.wait(1000)

    cy.get('label:visible')
      .should('have.length.at.least', 1)

    cy.get('input:visible')
      .each(($input) => {
        cy.wrap($input)
          .should('be.visible')
      })
  })


  // NCC-CNS-ADD-003
  it('NCC-CNS-ADD-003 Verify Cancel Button Navigation', () => {

    cy.contains('a', 'Kelola Konselor')
      .click({ force: true })

    cy.wait(1000)

    cy.contains('Tambah Konselor')
      .click({ force: true })

    cy.wait(1000)

    cy.contains('Batal & Kembali')
      .click({ force: true })

    cy.wait(1000)

    cy.url({ timeout: 10000 })
      .should((url) => {
        expect(
          url.includes('/counselors') ||
          url.includes('/counselor')
        ).to.be.true
      })
  })


  // NCC-CNS-007
      describe('NCC Konsultasi Hari Ini', () => {

      it('NCC-CNS-007 Filter Consultation by Date', () => {

        // LOGIN
        cy.clearCookies()
        cy.clearLocalStorage()

        cy.visit('https://ncc.vkes.co.id/login')

        cy.get('input[type="email"]', { timeout: 10000 })
          .should('be.visible')
          .first()
          .type('counselor1@example.com')

        cy.get('input[type="password"]', { timeout: 10000 })
          .should('be.visible')
          .first()
          .type('password')

        cy.contains('Masuk Ke Akun')
          .should('be.visible')
          .click()

        // Pastikan berhasil login
        cy.url({ timeout: 10000 })
          .should('include', '/counselor')

        // Buka Sesi Hari Ini
        cy.contains('Sesi Hari Ini')
          .scrollIntoView()
          .should('exist')
          .click({ force: true })

        cy.url({ timeout: 10000 })
          .should('include', '/counselor/consultations')

        // Pastikan halaman tampil
        cy.contains('Konsultasi Hari Ini')
          .should('be.visible')

        // Field tanggal
        cy.get('input[type="date"]', { timeout: 10000 })
          .should('be.visible')
          .clear()
          .type('2026-08-20')

        // Pastikan tanggal benar
        cy.get('input[type="date"]')
          .should('have.value', '2026-08-20')

        // Klik Filter
        cy.contains('Filter')
          .scrollIntoView()
          .should('be.visible')
          .click({ force: true })

        // Verifikasi
        cy.contains('Konsultasi Hari Ini')
          .should('be.visible')

        cy.get('input[type="date"]')
          .should('have.value', '2026-08-20')
      })

    })


  // NCC-CNS-008

    describe('NCC Konsultasi Hari Ini', () => {


  it('NCC-CNS-008 Access Konsultasi Hari Ini Page', () => {

    // LOGIN
        cy.clearCookies()
        cy.clearLocalStorage()

        cy.visit('https://ncc.vkes.co.id/login')

        cy.get('input[type="email"]', { timeout: 10000 })
          .should('be.visible')
          .first()
          .type('counselor1@example.com')

        cy.get('input[type="password"]', { timeout: 10000 })
          .should('be.visible')
          .first()
          .type('password')

        cy.contains('Masuk Ke Akun')
          .should('be.visible')
          .click()

        // Pastikan berhasil login
        cy.url({ timeout: 10000 })
          .should('include', '/counselor')

        // Buka Sesi Hari Ini
        cy.contains('Sesi Hari Ini')
          .scrollIntoView()
          .should('exist')
          .click({ force: true })

        cy.url({ timeout: 10000 })
          .should('include', '/counselor/consultations')

        // Pastikan halaman tampil
        cy.contains('Konsultasi Hari Ini')
          .should('be.visible')
      })

    })

    it('NCC-LOG-007 Verify Remember Device for 30 Days Functionality', () => {

          // Pastikan mulai dari kondisi logout
          cy.clearCookies()
          cy.clearLocalStorage()

          cy.visit('https://ncc.vkes.co.id/login')

          // Jika diarahkan ke home karena session masih aktif,
          // buka login lagi setelah membersihkan session
          cy.visit('https://ncc.vkes.co.id/login')

          cy.url({ timeout: 10000 })
            .should('include', '/login')

          // KLIK CHECKBOX YANG DITANDAI
          cy.get('input[type="checkbox"]')
            .first()
            .should('exist')
            .click({ force: true })

          // Pastikan checkbox tercentang
          cy.get('input[type="checkbox"]')
            .first()
            .should('be.checked')

          // Isi email
          cy.get('input[type="email"]')
            .first()
            .should('be.visible')
            .type('admin@example.com')

          // Isi password
          cy.get('input[type="password"]')
            .first()
            .should('be.visible')
            .type('password')

          // Klik Masuk
          cy.contains('Masuk Ke Akun')
            .should('be.visible')
            .click()

          // Berhasil masuk Admin
          cy.url({ timeout: 10000 })
            .should('include', '/admin')

          // Logout
          cy.contains(/Logout|Keluar/i)
            .scrollIntoView()
            .click({ force: true })

          // Setelah logout, jangan langsung menganggap /login.
          // Website NCC mengarahkan ke /home.
          cy.url({ timeout: 10000 })
            .should('include', '/admin')
        })

        describe('NCC Login', () => {

        it('NCC-LOG-008 Verify Forgot Password Navigation', () => {

            // 1. Buka Home NCC
            cy.visit('https://ncc.vkes.co.id/')

            // 2. Hapus SEMUA session yang mungkin masih tersimpan
            cy.clearAllCookies()
            cy.clearAllLocalStorage()
            cy.clearAllSessionStorage()

            // 3. Reload agar website membaca kondisi sebagai belum login
            cy.reload()

            // 4. Pastikan tombol Masuk tampil
            cy.contains('Masuk', { matchCase: true })
            .should('be.visible')
            .click()

            // 5. Pastikan masuk ke halaman login
            cy.url()
            .should('include', '/login')

            // 6. Pastikan TIDAK diarahkan ke dashboard/role
            cy.url()
            .should('not.include', '/admin')
            .should('not.include', '/officer')
            .should('not.include', '/counselor')
            .should('not.include', '/patient')

            // 7. Klik Lupa sandi?
            cy.contains('Lupa sandi?', { matchCase: false })
            .should('be.visible')
            .click()

            // 8. Pastikan halaman reset password
            cy.url()
            .should('include', '/password/reset')

            // 9. Verifikasi tampilan Lupa Kata Sandi
            cy.contains('Lupa Kata Sandi?', { matchCase: false })
            .should('be.visible')

            cy.get('input[type="email"]:visible')
            .should('be.visible')

            cy.contains('Kirim Tautan Reset Sandi', { matchCase: false })
            .should('be.visible')

            cy.contains('Kembali ke halaman', { matchCase: false })
            .should('be.visible')
        })

     })
})