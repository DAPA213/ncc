  describe('NCC Payment, NLK, Contact Module', () => {

    beforeEach(() => {

      cy.visit('https://ncc.vkes.co.id/login')

      cy.get('input[type="email"]')
        .type('admin@example.com')

      cy.get('input[type="password"]')
        .type('password')

      cy.contains('Masuk Ke Akun')
        .click()

      cy.url({ timeout: 15000 })
        .should('include', '/admin')
    })

  it('NCC-PAY-ADM-001 Verify Cash Payment Confirmation', () => {

    cy.contains('Riwayat Medis Pasien')
      .click({ force: true })

    cy.url()
      .should('include', '/consultations')

    cy.contains('Konfirmasi Pembayaran')
      .first()
      .click({ force: true })

    cy.contains('Konfirmasi Pembayaran', { timeout: 10000 })
      .should('exist')

    cy.contains('Pembayaran Tunai')
      .click({ force: true })

    cy.contains('Lanjutkan')
      .click({ force: true })

    cy.wait(3000)

    cy.get('body')
      .should('contain.text', 'Lunas')
  })

  it('NCC-PAY-ADM-003 Verify Cancel Payment Confirmation', () => {

    cy.contains('Riwayat Medis Pasien')
      .click({ force: true })

    cy.contains('Konfirmasi Pembayaran')
      .first()
      .click({ force: true })

    cy.contains('Konfirmasi Pembayaran', { timeout: 10000 })
      .should('exist')

   cy.contains('Batal')
      .click({ force: true })

    cy.wait(1000)

    cy.contains('Konfirmasi Pembayaran')
      .should('not.be.visible')
    })

  it('NCC-NLK-002 View NLK Reconciliation Dashboard', () => {

    cy.contains('Rekonsiliasi Dana NLK')
      .click({ force: true })

    cy.url()
      .should('include', 'nlk-reconciliation')

    cy.get('body')
      .should('contain.text', 'Total Dana')

    cy.get('body')
      .should('contain.text', 'Sudah Ditransfer')

    cy.get('body')
      .should('contain.text', 'Sisa Hutang')
  })

  it('NCC-NLK-003 Record Transfer to NLK', () => {

    cy.contains('Rekonsiliasi Dana NLK')
      .click({ force: true })

    cy.contains('Rekam Transfer')
      .click({ force: true })

    cy.contains('Rekam Transfer Baru')
      .should('be.visible')

    cy.get('input[placeholder*="500000"]')
      .type('100000')

    cy.get('textarea')
      .type('Transfer otomatis Cypress')

    cy.contains('Simpan Rekaman')
      .click({ force: true })

    cy.wait(3000)

    cy.get('body')
      .should('contain.text', '100.000')
  })

  it('NCC-NLK-004 View Transfer Proof', () => {

    cy.contains('Rekonsiliasi Dana NLK')
      .click({ force: true })

    cy.get('a,button')
      .contains(/lihat/i)
      .first()
      .click({ force: true })

    cy.wait(2000)

    cy.get('body')
      .should('be.visible')
  })

  it('NCC-CTC-003 View Contact Message List', () => {

    cy.contains('Pesan Kontak')
      .click({ force: true })

    cy.url()
      .should('include', '/contacts')

    cy.contains('Pesan Kontak')
      .should('exist')

    cy.get('table')
      .should('exist')
  })

  it('NCC-CTC-004 View Contact Message Detail', () => {

    cy.contains('Pesan Kontak')
      .click({ force: true })

    cy.url()
      .should('include', '/contacts')

    cy.get('svg')
      .first()
      .click({ force: true })

    cy.wait(2000)

    cy.get('body')
      .should('be.visible')
  })

    it('NCC-NLK-005 - Save Transfer Record Without Uploading Proof', () => {

    cy.contains('Rekonsiliasi Dana NLK', { timeout: 10000 })
      .click({ force: true })

    cy.contains('Rekam Transfer ke NLK', { timeout: 10000 })
      .click({ force: true })

    cy.get('input').then(($inputs) => {
      const visibleInputs = $inputs.filter(':visible')

      expect(visibleInputs.length).to.be.greaterThan(0)
    })

    cy.contains('Jumlah Transfer')
      .should('exist')

    cy.contains('Tanggal Transfer')
      .should('exist')

    cy.contains('Catatan Tambahan')
      .should('exist')

    cy.contains('Bukti Transfer')
      .should('exist')

    // Isi data transfer
    cy.get('input:visible')
      .filter('[type="number"]')
      .first()
      .type('100000')

    cy.get('input:visible')
      .filter('[type="date"]')
      .first()
      .type('2026-09-02')

    cy.get('textarea:visible')
      .first()
      .type('Transfer NLK tanpa bukti transfer')

    // Bukti transfer sengaja dikosongkan

    cy.contains('Simpan Rekaman', { timeout: 10000 })
      .click({ force: true })

    cy.wait(1000)

    // Pastikan histori transfer tampil
    cy.contains('Histori Transfer', { timeout: 10000 })
      .should('exist')
  })

})