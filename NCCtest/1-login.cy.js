describe('NCC Login Testing', () => {

  function login(email, password) {
    cy.visit('https://ncc.vkes.co.id/login')

    cy.contains('Selamat datang kembali', { timeout: 10000 })
      .should('be.visible')

    cy.get('input[type="email"]', { timeout: 10000 })
      .should('be.visible')
      .type(email)

    cy.get('input[type="password"]', { timeout: 10000 })
      .should('be.visible')
      .type(password)

    cy.contains('Masuk Ke Akun')
      .should('be.visible')
      .click()
  }

  it('NCC-LOG-001 Access Login Page', () => {
    cy.visit('https://ncc.vkes.co.id/login')

    cy.contains('Selamat datang kembali')
      .should('be.visible')

    cy.get('input[type="email"]')
      .should('exist')

    cy.get('input[type="password"]')
      .should('exist')

    cy.contains('Masuk Ke Akun')
      .should('exist')
  })

  it('NCC-LOG-002 Login sebagai Admin', () => {
    login('admin@example.com', 'password')
    cy.url({ timeout: 10000 }).should('include', '/admin')
  })

  it('NCC-LOG-003 Login sebagai Officer', () => {
    login('officer1@example.com', 'password')
    cy.url({ timeout: 10000 }).should('include', '/admin')
  })

  it('NCC-LOG-004 Login sebagai Counselor', () => {
    login('counselor1@example.com', 'password')
    cy.url({ timeout: 10000 }).should('include', '/counselor')
  })

  it('NCC-LOG-005 Login sebagai Patient', () => {
    login('patient1@example.com', 'password')
    cy.url({ timeout: 10000 }).should('include', '/patient')
  })

})