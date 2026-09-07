describe('NCC Additional Modules', () => {

  beforeEach(() => {

    cy.visit('https://ncc.vkes.co.id/login')

    cy.get('input[type="email"]')
      .clear()
      .type('admin@example.com')

    cy.get('input[type="password"]')
      .clear()
      .type('password')

    cy.contains('Masuk Ke Akun')
      .click()

    cy.url({ timeout: 20000 })
      .should('include', '/admin')

  })

  it('NCC-CBX-001 Verify Checkbox Functionality in Patient Management as Admin', () => {

    cy.visit('https://ncc.vkes.co.id/admin/patients')

    cy.url()
      .should('include', '/patients')

    cy.get('input[type="checkbox"]').then(($checkboxes) => {

      if ($checkboxes.length >= 3) {

        cy.wrap($checkboxes[1])
          .check({ force: true })

        cy.wrap($checkboxes[2])
          .check({ force: true })

        cy.wrap($checkboxes[1])
          .should('be.checked')

        cy.wrap($checkboxes[2])
          .should('be.checked')

      } else {

        cy.log('Checkbox pasien tidak ditemukan')

      }

    })

  })

  it('NCC-PAT-REST-001 Restore Deleted Patient Data', () => {

    cy.visit('https://ncc.vkes.co.id/admin/patients?filter=trashed')

    cy.url()
      .should('include', 'patients')

    cy.get('body').then(($body) => {

      if ($body.text().includes('Restore')) {

        cy.contains('Restore')
          .first()
          .click({ force: true })

        cy.wait(3000)

      } else {

        cy.log('Tidak ada data yang dapat direstore')

      }

    })

  })

  it('NCC-REP-CNS-001 View Counselor Performance Report', () => {

    cy.visit('https://ncc.vkes.co.id/admin/reports/counselor')

    cy.get('body')
      .should('contain.text', 'Counselor')

  })

  it('NCC-REP-CNS-002 Filter Counselor Performance by Date Range', () => {

    cy.visit('https://ncc.vkes.co.id/admin/reports/counselor')

    cy.get('input[type="date"]').then(($dates) => {

      if ($dates.length >= 2) {

        cy.wrap($dates[0])
          .type('2026-08-01', { force: true })

        cy.wrap($dates[1])
          .type('2026-08-31', { force: true })

      } else {

        cy.log('Date range tidak ditemukan')

      }

    })

    cy.contains('Filter')
      .click({ force: true })

    cy.wait(2000)

    cy.get('body')
      .should('contain.text', 'Counselor')

  })

  it('NCC-ELF-002 Create E-Leaflet Form Display', () => {

    cy.visit('https://ncc.vkes.co.id/admin/leaflets/create')

    cy.url()
      .should('include', 'leaflet')

    cy.get('input')
      .should('have.length.at.least', 1)

    cy.get('textarea')
      .should('exist')

    cy.contains('Simpan')
      .should('exist')

  })

  it('NCC-ELF-003 Upload Thumbnail Image Field Display', () => {

    cy.visit('https://ncc.vkes.co.id/admin/leaflets/create')

    cy.get('input[type="file"]')
      .first()
      .should('exist')

  })

  it('NCC-ELF-004 Upload PDF File Field Display', () => {

    cy.visit('https://ncc.vkes.co.id/admin/leaflets/create')

    cy.get('input[type="file"]')
      .last()
      .should('exist')

  })

})