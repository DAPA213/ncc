const BASE = 'https://ncc.vkes.co.id'


// ===============================
// COUNSELOR LANDING PAGE
// ===============================

it('NCC-CNS-LIST-001 - View Counselor List on Landing Page', () => {

  cy.visit(BASE)

  cy.contains('Bekerja dengan ahli gizi terbaik', { timeout: 10000 })
    .scrollIntoView()
    .should('exist')

  cy.contains('Bekerja dengan ahli gizi terbaik')
    .should('exist')
})


it('NCC-CNS-LIST-002 - Navigate Counselor Slider', () => {

  cy.visit(BASE)

  cy.contains('Bekerja dengan ahli gizi terbaik', { timeout: 10000 })
    .scrollIntoView()
    .should('exist')

  cy.get('button')
    .then(($buttons) => {
      const buttons = [...$buttons].filter((el) => {
        const label = (
          el.getAttribute('aria-label') ||
          el.innerText ||
          ''
        ).toLowerCase()

        return (
          label.includes('next') ||
          label.includes('prev') ||
          label.includes('kanan') ||
          label.includes('kiri')
        )
      })

      expect(buttons.length, 'tombol slider').to.be.greaterThan(0)

      cy.wrap(buttons[0])
        .click({ force: true })
    })
})


// ===============================
// PATIENT DASHBOARD
// ===============================

beforeEach(() => {

  cy.visit(BASE + '/login')

  cy.get('input[type="email"]')
    .type('patient1@example.com')

  cy.get('input[type="password"]')
    .type('password')

  cy.contains('button', 'Masuk Ke Akun')
    .click({ force: true })

  cy.url({ timeout: 10000 })
    .should('not.include', '/login')
})


it('NCC-DAS-PAT-001 - View Patient Dashboard', () => {

  cy.url()
    .should('not.include', '/login')

  cy.contains(/Dashboard/i, { timeout: 10000 })
    .should('exist')
})


it('NCC-DAS-PAT-002 - View InBody Trend Chart', () => {

  cy.contains(/Tren Score InBody/i, { timeout: 10000 })
    .should('exist')
})


it('NCC-DAS-PAT-003 - View Latest Nutrition Summary', () => {

  cy.contains(/Ringkasan Gizi Terakhir/i, { timeout: 10000 })
    .should('exist')

  cy.contains(/Target Kalori/i)
    .should('exist')

  cy.contains(/Jenis Diet/i)
    .should('exist')

  cy.contains(/Berat Badan/i)
    .should('exist')
})


it('NCC-DAS-PAT-004 - View Consultation History', () => {

  cy.contains(/Riwayat Konsultasi Anda/i, { timeout: 10000 })
    .should('exist')
})


it('NCC-DAS-PAT-005 - View Consultation Detail', () => {

  cy.contains('Detail', { timeout: 10000 })
    .first()
    .click({ force: true })

  cy.url()
    .should('not.include', '/login')
})