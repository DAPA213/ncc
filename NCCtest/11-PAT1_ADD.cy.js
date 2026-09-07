describe('NCC Admin Patient & Officer Module', () => {

  beforeEach(() => {

    cy.visit('https://ncc.vkes.co.id/login')

    cy.get('input[type="email"]')
      .should('be.visible')
      .type('admin@example.com')

    cy.get('input[type="password"]')
      .should('be.visible')
      .type('password')

    cy.contains('Masuk Ke Akun')
      .click({ force: true })

    cy.url({ timeout: 15000 })
      .should('include', '/admin')
  })
  

  it('NCC-ADM-PAT-001 Verify Patient List Display', () => {

    cy.contains('Kelola Pasien')
      .click({ force: true })

    cy.contains('Kelola Pasien')
      .should('exist')

    cy.get('table')
      .should('exist')

    cy.get('tbody tr')
      .should('have.length.at.least', 1)

    cy.get('body')
      .should('contain.text', 'Nama')
      .and('contain.text', 'Kontak')
      .and('contain.text', 'Status')
  })


  it('NCC-ADM-PAT-002 View Patient Detail', () => {

    cy.contains('Kelola Pasien')
      .click({ force: true })

    cy.get('tbody tr')
      .first()
      .within(() => {

        // Klik ikon mata
        cy.get('a, button')
          .filter(':visible')
          .first()
          .click({ force: true })

      })

    cy.wait(1000)

    cy.get('body')
      .should('be.visible')
  })


  it('NCC-ADM-PAT-003 Verify Patient Status Display', () => {

    cy.contains('Kelola Pasien')
      .click({ force: true })

    cy.get('tbody tr')
      .should('have.length.at.least', 1)

    cy.get('tbody tr')
      .first()
      .within(() => {

        cy.get('td')
          .should('have.length.at.least', 1)

      })

    cy.get('body')
      .should('contain.text', 'Status')
  })


  it('NCC-ADM-PAT-004 Verify Patient List Order', () => {

    cy.contains('Kelola Pasien')
      .click({ force: true })

    cy.get('tbody tr')
      .should('have.length.at.least', 1)

    cy.get('tbody tr')
      .then(($rows) => {

        const firstOrder = [...$rows].map(row => row.innerText)

        cy.wrap(firstOrder)
          .as('firstOrder')

      })

    cy.reload()

    cy.get('tbody tr')
      .should('have.length.at.least', 1)

    cy.get('tbody tr')
      .then(($rows) => {

        const secondOrder = [...$rows].map(row => row.innerText)

        cy.get('@firstOrder')
          .then((firstOrder) => {

            expect(secondOrder)
              .to.deep.equal(firstOrder)

          })

      })
  })


  it('NCC-ADM-PAT-005 Verify Patient Contact Information Display', () => {

    cy.contains('Kelola Pasien')
      .click({ force: true })

    cy.get('tbody tr')
      .first()
      .within(() => {

        cy.get('td')
          .should('have.length.at.least', 1)

      })

    cy.get('body')
      .should('contain.text', 'Kontak')
  })


  // =====================================================
  // OFFICER
  // =====================================================

      it('NCC-OFC-ADD-001 Open Add Officer Form', () => {

        cy.contains('Kelola Petugas')
          .click({ force: true })

        cy.contains('Kelola Petugas')
          .should('exist')

        cy.contains('Tambah Petugas')
          .click({ force: true })

        cy.get('body')
          .should('contain.text', 'Tambah Petugas')

        cy.get('input')
          .should('have.length.at.least', 1)
      })

        
        
      it('NCC-OFC-ADD-002 Create Officer with Valid Data', () => {

        cy.contains('a', 'Kelola Petugas')
          .click({ force: true })

        cy.wait(1000)

        cy.contains('Tambah Petugas')
          .click({ force: true })

        cy.wait(1000)

        cy.url({ timeout: 10000 })
          .should('include', '/admin/officer/create')


        // Nama Lengkap
        cy.get('input:visible')
          .filter('[name="name"], [name="full_name"]')
          .first()
          .clear()
          .type('Cypress Test Officer')


        // Email
        cy.get('input[type="email"]:visible')
          .first()
          .clear()
          .type(`cypress.officer.${Date.now()}@gmail.com`)


        // Nomor Telepon
        cy.get('input:visible')
          .filter('[name="phone"], [name="phone_number"], [name="whatsapp"]')
          .first()
          .clear()
          .type('81234567890')


        // Peran
        cy.get('input:visible')
          .filter('[name="role"], [name="position"]')
          .first()
          .clear()
          .type('Officer')


        // Password
        cy.get('input[type="password"]:visible')
          .first()
          .clear()
          .type('Cypress@12345')


        // Alamat
        cy.get('textarea:visible')
          .first()
          .clear()
          .type('Jl. Cypress Testing No. 123, Jember')


        // Simpan
        cy.contains('button', 'Simpan Data Petugas')
          .click({ force: true })

        cy.wait(2000)

        cy.url({ timeout: 10000 })
          .should('not.include', '/admin/officer/create')

      })



  it('NCC-OFC-ADD-003 Create Officer with Empty Required Fields', () => {

    cy.contains('Kelola Petugas')
      .click({ force: true })

    cy.contains('Tambah Petugas')
      .click({ force: true })

    // Jangan isi field apa pun
    cy.contains(/Simpan Data Petugas|Simpan/)
      .click({ force: true })

    cy.wait(1000)

  })

  it('NCC-OFC-ADD-004 Verify Placeholder and Label on Add Officer Form', () => {

    cy.contains('Kelola Petugas')
      .click({ force: true })

    cy.contains('Tambah Petugas')
      .click({ force: true })

    cy.get('body')
      .should('contain.text', 'Foto Profil')

    cy.get('input[type="file"]')
      .should('exist')

    cy.get('body')
      .should('be.visible')
  })


  it('NCC-OFC-ADD-005 Verify Upload Photo Component Display', () => {

    cy.contains('Kelola Petugas')
      .click({ force: true })

    cy.contains('Tambah Petugas')
      .click({ force: true })

    cy.get('input[type="file"]')
      .should('exist')

    cy.get('body')
      .should('contain.text', 'Foto Profil')
  })


  it('NCC-OFC-ADD-006 Verify Cancel Button on Add Officer Form', () => {

    cy.contains('Kelola Petugas')
      .click({ force: true })

    cy.contains('Tambah Petugas')
      .click({ force: true })

    cy.contains('Batal & Kembali')
      .click({ force: true })

    cy.wait(1000)

    cy.contains('Kelola Petugas')
      .should('exist')
  })


  it('NCC-OFC-ADD-007 Verify Add Officer Form Display', () => {

    cy.contains('Kelola Petugas')
      .click({ force: true })

    cy.contains('Tambah Petugas')
      .click({ force: true })

    // Judul halaman
    cy.contains('Tambah Petugas')
      .should('exist')

    // Foto
    cy.get('input[type="file"]')
      .should('exist')

    // Input yang terlihat
    cy.get('input:not([type="hidden"])')
      .should('have.length.at.least', 1)

    // Area textarea jika tersedia
    cy.get('textarea')
      .should('exist')

    // Tombol
    cy.contains(/Simpan Data Petugas|Simpan/)
      .should('exist')

    cy.contains('Batal & Kembali')
      .should('exist')
  })

})