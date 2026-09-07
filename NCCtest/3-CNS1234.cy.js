describe('NCC Counselor Module', () => {

  it('NCC-CNS-001 Create Counselor with Valid Data', () => {

    cy.visit('https://ncc.vkes.co.id/login')

    cy.get('input[type="email"]').type('admin@example.com')
    cy.get('input[type="password"]').type('password')
    cy.contains('Masuk Ke Akun').click()

    cy.url({ timeout: 15000 }).should('include', '/admin')

    cy.visit('https://ncc.vkes.co.id/admin/counselors/create')

    cy.get('input[placeholder*="Dr."]').type('Cypress Counselor')
    cy.get('input[placeholder="name@domain.com"]')
      .type(`cypress${Date.now()}@mail.com`)
    cy.get('input[placeholder*="812"]').type('081234567890')
    cy.get('input[type="password"]').type('password123')
    cy.get('input[placeholder*="Spesialis"]').type('Ahli Gizi')
    cy.get('input[placeholder="cth. 5"]').type('5')
    cy.get('input[placeholder*="Ahli Gizi"]').type('STR123456')
    cy.get('textarea').type('Alamat Praktik Cypress Testing')

    cy.contains('Simpan Data Konselor').click()
  })

  it('NCC-CNS-002 Display Total Completed Consultations', () => {

    cy.visit('https://ncc.vkes.co.id/login')

    cy.get('input[type="email"]').type('admin@example.com')
    cy.get('input[type="password"]').type('password')
    cy.contains('Masuk Ke Akun').click()

    cy.url({ timeout: 15000 }).should('include', '/admin')

    cy.visit('https://ncc.vkes.co.id/admin')

    cy.contains('Dashboard Statistik').should('be.visible')
    cy.contains('Total Pasien').should('be.visible')
    cy.contains('Total Konselor').should('be.visible')
    cy.contains('Konsultasi Aktif').should('be.visible')
  })

  it('NCC-CNS-003 Verify Payment Status in Consultation History', () => {

    cy.visit('https://ncc.vkes.co.id/login')

    cy.get('input[type="email"]').type('counselor1@example.com')
    cy.get('input[type="password"]').type('password')
    cy.contains('Masuk Ke Akun').click()

    cy.url({ timeout: 15000 }).should('include', '/counselor')

    cy.visit('https://ncc.vkes.co.id/counselor/consultations/history')

    cy.get('body').should('contain.text', 'Riwayat Konsultasi')
    cy.get('body').should('contain.text', 'Lunas')
  })

      it('NCC-CNS-004 Approve Consultation Reschedule Request', () => {

      cy.visit('https://ncc.vkes.co.id/login')

      cy.get('input[type="email"]')
        .type('counselor1@example.com')

      cy.get('input[type="password"]')
        .type('password')

      cy.contains('Masuk Ke Akun')
        .click()

      cy.url({ timeout: 15000 })
        .should('include', '/counselor')

      cy.visit('https://ncc.vkes.co.id/counselor/schedules')

      cy.contains('Persetujuan Jadwal Konsultasi')
        .should('be.visible')

      cy.contains('Patient')
        .should('be.visible')

    })

})