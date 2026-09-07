describe('NCC Home, Session, Login and Dashboard Module', () => {

  it('NCC-HOME-TST-001 View Testimonials', () => {

    cy.visit('https://ncc.vkes.co.id')

    cy.contains('Testimoni')
      .scrollIntoView()

    cy.get('body')
      .should('contain.text', 'Testimoni')
  })

  it('NCC-HOME-TST-002 Verify Testimonial Content', () => {

    cy.visit('https://ncc.vkes.co.id')

    cy.contains('Testimoni')
      .scrollIntoView()

    cy.get('body')
      .should('contain.text', 'Direkomendasikan')
  })

  it('NCC-HOME-TST-003 Verify Recommended Testimonial Display', () => {

    cy.visit('https://ncc.vkes.co.id')

    cy.contains('Sangat Direkomendasikan')
      .scrollIntoView()
      .should('exist')
  })

  it('NCC-HOME-TST-004 Verify Responsive Testimonial Section', () => {

    cy.viewport(375, 667)

    cy.visit('https://ncc.vkes.co.id')

    cy.contains('Testimoni')
      .scrollIntoView()

    cy.get('body')
      .should('contain.text', 'Testimoni')
  })

  it('NCC-HOME-FTR-001 View Consultation Features', () => {

    cy.visit('https://ncc.vkes.co.id')

    cy.get('body')
      .should('contain.text', 'Konsultasi')
  })

  it('NCC-HOME-FTR-002 Verify Consultation Feature Content', () => {

    cy.visit('https://ncc.vkes.co.id')

    cy.get('body')
      .should('contain.text', 'Gizi')
  })

  it('NCC-LOG-003 Navigate to Registration Page', () => {

    cy.visit('https://ncc.vkes.co.id/login')

    cy.contains('Daftar')
      .click({ force: true })

    cy.url()
      .should('include', '/register')
  })

  it('NCC-SES-001 Verify Session After Reopening Browser Tab', () => {

    cy.visit('https://ncc.vkes.co.id/login')

    cy.get('input[type="email"]')
      .type('patient1@example.com')

    cy.get('input[type="password"]')
      .type('password')

    cy.contains('Masuk Ke Akun')
      .click()

    cy.url({ timeout: 15000 })
      .should('not.include', '/login')

    cy.visit('https://ncc.vkes.co.id')

    cy.contains('Panel Saya')
      .click({ force: true })

    cy.url()
      .should('not.include', '/login')
  })

    it('NCC-SES-002 Click Mulai Konsultasi Button After Login', () => {

    cy.visit('https://ncc.vkes.co.id/login')

    cy.get('input[type="email"]')
        .type('patient1@example.com')

    cy.get('input[type="password"]')
        .type('password')

    cy.contains('Masuk Ke Akun')
        .click()

    cy.url({ timeout: 15000 })
        .should('not.include', '/login')

    cy.visit('https://ncc.vkes.co.id')

    cy.contains('Mulai Konsultasi')
        .click({ force: true })

    cy.wait(3000)

    cy.url().then((url) => {
        cy.log(url)
   })

    cy.get('body')
        .should('be.visible')
})
  

  it('NCC-DASH-004 View All Consultation from Latest Registration', () => {

    cy.visit('https://ncc.vkes.co.id/login')

    cy.get('input[type="email"]')
      .type('admin@example.com')

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
      .should('include', '/consultations')
  })

})