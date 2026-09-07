describe('NCC Counselor Handling & Status', () => {

  beforeEach(() => {
    cy.visit('https://ncc.vkes.co.id/login')

    cy.get('input[type="email"]')
      .type('counselor1@example.com')

    cy.get('input[type="password"]')
      .type('password')

    cy.contains('Masuk Ke Akun')
      .click({ force: true })

    cy.url({ timeout: 15000 })
      .should('not.include', '/login')
  })


  // =====================================================
  // NCC-CNS-HAND-002
  // =====================================================

  it('NCC-CNS-HAND-002 - Save Consultation Result Without Filling Required Fields as Counselor', () => {

    cy.contains('Sesi Hari Ini', { timeout: 10000 })
      .click({ force: true })

    cy.contains('Tangani', { timeout: 10000 })
      .first()
      .click({ force: true })

    cy.contains('Simpan Hasil Konsultasi', { timeout: 10000 })
      .click({ force: true })

  })


  // =====================================================
  // NCC-CNS-HAND-003
  // =====================================================

  it('NCC-CNS-HAND-003 - Save Consultation Result Without Uploading Image File as Counselor', () => {

    cy.contains('Sesi Hari Ini', { timeout: 10000 })
      .click({ force: true })

    cy.contains('Tangani', { timeout: 10000 })
      .first()
      .click({ force: true })

    // Field tidak diisi
    // File gambar juga sengaja tidak diupload

    cy.contains('Simpan Hasil Konsultasi', { timeout: 10000 })
      .click({ force: true })

  })


  // =====================================================
  // NCC-CNS-STS-001
  // =====================================================

  it('NCC-CNS-STS-001 - Verify Counselor Availability Status Display', () => {

    cy.contains('Dashboard', { timeout: 10000 })
      .click({ force: true })

    cy.contains(
      /Aktif|Tersedia|Nonaktif|Offline/i,
      { timeout: 10000 }
    )
      .should('exist')

  })


  // =====================================================
  // NCC-CNS-STS-002
  // =====================================================

  it('NCC-CNS-STS-002 - Verify Change Counselor Status from Aktif to Nonaktif', () => {

    cy.contains('Dashboard', { timeout: 10000 })
      .click({ force: true })

    cy.contains(/Aktif|Tersedia/i, { timeout: 10000 })
      .first()
      .click({ force: true })

    cy.contains('Ya, Ubah Status', { timeout: 10000 })
      .click({ force: true })

    cy.contains(/Nonaktif|Offline/i, { timeout: 10000 })
      .should('exist')

  })


  // =====================================================
  // NCC-CNS-STS-003
  // =====================================================

  it('NCC-CNS-STS-003 - Verify Change Counselor Status from Nonaktif to Aktif', () => {

    cy.contains('Dashboard', { timeout: 10000 })
      .click({ force: true })

    cy.contains(/Nonaktif|Offline/i, { timeout: 10000 })
      .first()
      .click({ force: true })

    cy.contains('Ya, Ubah Status', { timeout: 10000 })
      .click({ force: true })

    cy.contains(/Aktif|Tersedia/i, { timeout: 10000 })
      .should('exist')

  })


  // =====================================================
  // NCC-CNS-STS-004
  // =====================================================

  it('NCC-CNS-STS-004 - Verify Cancel Status Change', () => {

    cy.contains('Dashboard', { timeout: 10000 })
      .click({ force: true })

    cy.contains(
      /Aktif|Tersedia|Nonaktif|Offline/i,
      { timeout: 10000 }
    )
      .first()
      .click({ force: true })

    cy.contains('Batal', { timeout: 10000 })
      .click({ force: true })

  })

})  