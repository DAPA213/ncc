const BASE = 'https://ncc.vkes.co.id'

beforeEach(() => {
  cy.visit(BASE + '/login')

  cy.get('input[type="email"]')
    .type('admin@example.com')

  cy.get('input[type="password"]')
    .type('password')

  cy.contains('button', 'Masuk Ke Akun')
    .click({ force: true })

  cy.url({ timeout: 10000 })
    .should('include', '/admin')
})


// ===============================
// NCC-TAB
// ===============================

it('NCC-TAB-001 - Verify Navigation to Riwayat Konsultasi Tab', () => {

  cy.contains('Riwayat Medis Pasien')
    .click({ force: true })

  cy.contains('Riwayat Konsultasi', { timeout: 10000 })
    .click({ force: true })

  cy.url()
    .should('include', '/admin/consultations?tab=consultation')

  cy.contains('Riwayat Konsultasi')
    .should('exist')

  cy.contains('Aksi')
    .should('exist')
})


it('NCC-TAB-002 - Verify Navigation to Riwayat Asesmen Tab', () => {

  cy.contains('Riwayat Medis Pasien')
    .click({ force: true })

  cy.contains('Riwayat Asesmen', { timeout: 10000 })
    .click({ force: true })

  cy.contains('Riwayat Asesmen')
    .should('exist')
})


it('NCC-TAB-003 - Verify Switching Between Riwayat Konsultasi and Riwayat Asesmen Tabs', () => {

  cy.contains('Riwayat Medis Pasien')
    .click({ force: true })

  cy.contains('Riwayat Konsultasi', { timeout: 10000 })
    .click({ force: true })

  cy.contains('Riwayat Konsultasi')
    .should('exist')

  cy.contains('Riwayat Asesmen')
    .click({ force: true })

  cy.contains('Riwayat Asesmen')
    .should('exist')

  cy.contains('Riwayat Konsultasi')
    .click({ force: true })

  cy.contains('Riwayat Konsultasi')
    .should('exist')
})


// ===============================
// NCC-SCH
// ===============================

it('NCC-SCH-001 - Verify Assessment Schedule Approval List Display', () => {

  cy.contains('Persetujuan Jadwal')
    .click({ force: true })

  cy.contains('Persetujuan Jadwal Asesmen', { timeout: 10000 })
    .should('exist')

  cy.contains('Pasien')
    .should('exist')

  cy.contains('Reschedule')
    .should('exist')

  cy.contains('Setujui')
    .should('exist')
})


it('NCC-SCH-002 - Approve Assessment Schedule Request', () => {

  cy.contains('Persetujuan Jadwal')
    .click({ force: true })

  cy.contains('Setujui', { timeout: 10000 })
    .first()
    .click({ force: true })

  cy.wait(1000)

  cy.url()
    .should('include', '/schedules')
})

it('NCC-SCH-003 - Reschedule Assessment Schedule Request', () => {

  cy.contains('Persetujuan Jadwal')
    .click({ force: true })

  cy.contains('Reschedule', { timeout: 10000 })
    .first()
    .click({ force: true })

  cy.contains(/Reschedule|Jadwal/i)
    .should('exist')
})


it('NCC-SCH-004 - Verify Patient Information Display in Schedule Approval List', () => {

  cy.contains('Persetujuan Jadwal')
    .click({ force: true })

  cy.url({ timeout: 10000 })
    .should('include', '/schedules')

  cy.get('table', { timeout: 10000 })
    .should('exist')

  cy.get('tbody tr', { timeout: 10000 })
    .should('have.length.at.least', 1)
})