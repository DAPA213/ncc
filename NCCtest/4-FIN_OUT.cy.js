const BASE = 'https://ncc.vkes.co.id'

const akun = {
  Admin: ['admin@example.com', 'password', '/admin'],
  Patient: ['patient1@example.com', 'password', '/patient']
}

Cypress.on('uncaught:exception', () => false)

function loginAs(role) {
  const [email, password, halaman] = akun[role]

  cy.visit(`${BASE}/login`)

  cy.get('input[type="email"]')
    .type(email)

  cy.get('input[type="password"]')
    .type(password)

  cy.contains('Masuk Ke Akun')
    .click({ force: true })

  cy.url({ timeout: 10000 })
    .should('include', halaman)
}


describe('NCC UAT Test Cases', () => {

  // NCC-FIN-001
  it('NCC-FIN-001 - Filter Financial Report by Date Range', () => {

    loginAs('Admin')

    cy.visit(`${BASE}/admin/reports/financial`)

    cy.contains('Laporan Keuangan')
      .should('exist')

    cy.get('input[type="date"]')
      .eq(0)
      .type('2026-08-01')

    cy.get('input[type="date"]')
      .eq(1)
      .type('2026-08-31')

    cy.contains('button', 'Filter')
      .click()

    cy.url()
      .should('include', 'start_date=2026-08-01')
      .and('include', 'end_date=2026-08-31')
  })


 // NCC-PAY-001
describe('NCC Payment', () => {

  it('NCC-PAY-001 - Redirect to Payment Method', () => {

    // 1. Login sebagai Pasien
    cy.visit('https://ncc.vkes.co.id/login')

    cy.get('input[type="email"]')
      .type('patient1@example.com')

    cy.get('input[type="password"]')
      .type('password')

    cy.contains('button', 'Masuk Ke Akun')
      .click({ force: true })

    // 2. Buka Beli Paket
    cy.contains('Beli Paket')
      .should('exist')
      .click({ force: true })

    cy.wait(1000)

    // 3. Pilih paket
    cy.contains('Pilih Paket Ini')
      .first()
      .click({ force: true })

    // 4. Konfirmasi
    cy.contains('Konfirmasi Pemilihan Paket')
      .should('be.visible')

    cy.contains('Ya, Lanjutkan')
      .click({ force: true })

    cy.wait(1000)

    // 5. Pilih konselor
    cy.get('select:visible')
      .first()
      .select(1)

    // 6. Pilih jadwal
    cy.get('input[type="datetime-local"]:visible')
      .first()
      .type('2026-09-01T10:00')

    // 7. Lanjut pembayaran
    cy.contains('button', 'Daftar & Lanjut Pembayaran')
      .should('exist')
      .click({ force: true })

    // 8. Tunggu redirect ke Xendit
    cy.wait(5000)

    // 9. Cek URL pembayaran
    cy.url({ timeout: 20000 })
      .should('include', 'checkout-staging.xendit.co')
  })  

})

  // NCC-NLK-001
  it('NCC-NLK-001 - Access Transfer Recording Form', () => {

    loginAs('Admin')

    cy.visit(`${BASE}/admin/reports/nlk-reconciliation`)

    cy.contains(/Rekam Transfer ke NLK/i)
      .click({ force: true })

    cy.contains('Rekam Transfer Baru')
      .should('be.visible')

    cy.contains('Jumlah Transfer (Rp)')
      .should('be.visible')

    cy.contains('Tanggal Transfer')
      .should('be.visible')

    cy.contains('Bukti Transfer')
      .should('be.visible')

    cy.contains('Catatan Tambahan')
      .should('be.visible')

    cy.contains('Simpan Rekaman')
      .should('exist')

    cy.contains('Batal')
      .should('exist')
  })


  // NCC-DAS-003
  it('NCC-DAS-003 - Verify Dashboard Responsiveness', () => {

    loginAs('Admin')

    cy.visit(`${BASE}/admin`)

    cy.viewport(1366, 768)

    cy.contains('Dashboard')
      .should('exist')

    cy.viewport(375, 667)

    cy.contains('Dashboard')
      .should('exist')

    cy.viewport(1920, 1080)

    cy.contains('Dashboard')
      .should('exist')
  })


  // NCC-CNS-HIS-001
  it('NCC-CNS-HIS-001 - Access Counselor Performance Log', () => {

    loginAs('Admin')

    cy.visit(`${BASE}/admin/reports/counselor`)

    cy.contains('Kinerja Konselor')
      .should('exist')

    cy.contains(/Total Pasien/i)
      .should('exist')

    cy.contains(/Revenue/i)
      .should('exist')

    cy.contains('Lihat Log')
      .first()
      .click({ force: true })

    cy.contains(/Riwayat|Log/i)
      .should('exist')
  })


  // NCC-CTC-001
  it('NCC-CTC-001 - Send Contact Message', () => {

    cy.visit(BASE)

    cy.contains('Hubungi Kami')
      .click({ force: true })

    cy.get('input[placeholder="Masukkan nama Anda"]')
      .type('Cypress Test User')

    cy.get('input[placeholder="name@domain.com"]')
      .type(`cypress${Date.now()}@mail.com`)

    cy.get('textarea[placeholder="Bagaimana kami bisa membantu?"]')
      .type('Pesan test dari Cypress')

    cy.contains('Kirim Pesan')
      .click({ force: true })
  })


  // NCC-CONS-001
  it('NCC-CONS-001 - Click Mulai Konsultasi Before Login', () => {

    cy.visit(BASE)

    cy.contains(/Mulai Konsultasi/i)
      .click({ force: true })

    cy.url()
      .should('include', '/login')

    cy.get('input[type="email"]')
      .should('exist')

    cy.get('input[type="password"]')
      .should('exist')
  })


 // NCC-LOGOUT-001
    it('NCC-LOGOUT-001 - Logout from System', () => {

      loginAs('Admin')

      cy.visit(`${BASE}/admin`)

      cy.contains(/Logout|Keluar/i)
        .click({ force: true })

      cy.contains('Ya, Keluar')
        .click({ force: true })

      // Setelah logout diarahkan ke homepage
      cy.url({ timeout: 10000 })
        .should('eq', `${BASE}/`)
    })
})