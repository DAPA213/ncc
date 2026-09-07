describe('NCC Registration Test', () => {

  beforeEach(() => {
    cy.visit('https://ncc.vkes.co.id/register')
  })

   // NCC-REG-001
  it('NCC-REG-001 Verify Register Page Display', () => {

    cy.visit('https://ncc.vkes.co.id/login')

    // Klik Daftar sekarang
    cy.contains('Daftar sekarang')
      .scrollIntoView()
      .should('exist')
      .click({ force: true })

    cy.url()
      .should('include', '/register')

    // Cek halaman register
    cy.contains('Mulai hidup sehat')
      .should('be.visible')

    cy.get('input[placeholder="Wira Pradana"]')
      .should('be.visible')

    cy.get('input[placeholder="name@domain.com"]')
      .should('be.visible')

    cy.get('input[placeholder="08123456xxx"]')
      .should('be.visible')

    cy.get('input[placeholder="Minimal 8 karakter"]')
      .should('be.visible')

    // Tombol berada di area yang ter-clipping,
    // jadi gunakan exist + force
    cy.contains('button', 'Buat Akun Pasien')
      .should('exist')
      .click({ force: true })
  })

      // NCC-REG-002
      it('NCC-REG-002 Register with Valid Data', () => {

        cy.visit('https://ncc.vkes.co.id/register')

        // Nama
        cy.get('input[placeholder="Wira Pradana"]')
          .type('Cypress Test Patient')

        // Jenis Kelamin
        cy.get('select')
          .first()
          .select('Laki-laki')

        // Tanggal lahir
        cy.get('input[type="date"]')
          .type('2000-01-01')

        // Email unik
        cy.get('input[placeholder="name@domain.com"]')
          .type(`cypatient${Date.now()}@example.com`)

        // Nomor telepon
        cy.get('input[placeholder="08123456xxx"]')
          .type('0812345678902')  // ganti dulu

        // Password
        cy.get('input[placeholder="Minimal 8 karakter"]')
          .type('Cypress123')

        // Centang persetujuan
        cy.get('input[type="checkbox"]')
          .first()
          .check({ force: true })

        // Klik Buat Akun Pasien
        cy.contains('button', 'Buat Akun Pasien')
          .click({ force: true })

        // Tunggu proses registrasi
        cy.wait(3000)

        // Berhasil masuk Dashboard Pasien
        cy.url({ timeout: 10000 })
          .should('include', '/patient')
      })

  // NCC-REG-003
  it('NCC-REG-003 Register with Empty Required Fields', () => {
    cy.contains('button', 'Buat Akun Pasien')
      .click({ force: true })

    cy.url()
      .should('include', '/register')
  })

  // NCC-REG-004
  it('NCC-REG-004 Register with Invalid Email Format', () => {
    cy.get('input[placeholder="Wira Pradana"]')
      .type('Cypress Test Patient')

    cy.get('select')
      .first()
      .select('Laki-laki')

    cy.get('input[type="date"]')
      .type('2000-01-01')

    cy.get('input[placeholder="name@domain.com"]')
      .type('email-salah')

    cy.get('input[placeholder="08123456xxx"]')
      .type('081234567890')

    cy.get('input[placeholder="Minimal 8 karakter"]')
      .type('Cypress123')

    cy.get('input[type="checkbox"]')
      .check({ force: true })

    cy.contains('button', 'Buat Akun Pasien')
      .click({ force: true })

    cy.url()
      .should('include', '/register')
  })

  // NCC-REG-005
  it('NCC-REG-005 Register with Existing Email', () => {
    cy.get('input[placeholder="Wira Pradana"]')
      .type('Cypress Test Patient')

    cy.get('select')
      .first()
      .select('Laki-laki')

    cy.get('input[type="date"]')
      .type('2000-01-01')

    cy.get('input[placeholder="name@domain.com"]')
      .type('patient1@example.com')

    cy.get('input[placeholder="08123456xxx"]')
      .type('081234567890')

    cy.get('input[placeholder="Minimal 8 karakter"]')
      .type('Cypress123')

    cy.get('input[type="checkbox"]')
      .check({ force: true })

    cy.contains('button', 'Buat Akun Pasien')
      .click({ force: true })

    cy.url()
      .should('include', '/register')
  })

  // NCC-REG-006
  it('NCC-REG-006 Register with Invalid Phone Number', () => {
    cy.get('input[placeholder="Wira Pradana"]')
      .type('Cypress Test Patient')

    cy.get('select')
      .first()
      .select('Laki-laki')

    cy.get('input[type="date"]')
      .type('2000-01-01')

    cy.get('input[placeholder="name@domain.com"]')
      .type(`cypress${Date.now()}@example.com`)

    cy.get('input[placeholder="08123456xxx"]')
      .type('123')

    cy.get('input[placeholder="Minimal 8 karakter"]')
      .type('Cypress123')

    cy.get('input[type="checkbox"]')
      .check({ force: true })

    cy.contains('button', 'Buat Akun Pasien')
      .click({ force: true })

    cy.url()
      .should('include', '/register')
  })

  // NCC-REG-007
  it('NCC-REG-007 Register with Password Less Than 8 Characters', () => {
    cy.get('input[placeholder="Wira Pradana"]')
      .type('Cypress Test Patient')

    cy.get('select')
      .first()
      .select('Laki-laki')

    cy.get('input[type="date"]')
      .type('2000-01-01')

    cy.get('input[placeholder="name@domain.com"]')
      .type(`cypress${Date.now()}@example.com`)

    cy.get('input[placeholder="08123456xxx"]')
      .type('081234567890')

    cy.get('input[placeholder="Minimal 8 karakter"]')
      .type('123')

    cy.get('input[type="checkbox"]')
      .check({ force: true })

    cy.contains('button', 'Buat Akun Pasien')
      .click({ force: true })

    cy.url()
      .should('include', '/register')
  })

  // NCC-REG-008
  it('NCC-REG-008 Register Without Accepting Terms and Privacy Policy', () => {
    cy.get('input[placeholder="Wira Pradana"]')
      .type('Cypress Test Patient')

    cy.get('select')
      .first()
      .select('Laki-laki')

    cy.get('input[type="date"]')
      .type('2000-01-01')

    cy.get('input[placeholder="name@domain.com"]')
      .type(`cypress${Date.now()}@example.com`)

    cy.get('input[placeholder="08123456xxx"]')
      .type('081234567890')

    cy.get('input[placeholder="Minimal 8 karakter"]')
      .type('Cypress123')

    // Checkbox sengaja tidak dicentang
    cy.get('input[type="checkbox"]')
      .should('not.be.checked')

    cy.contains('button', 'Buat Akun Pasien')
      .click({ force: true })

    cy.url()
      .should('include', '/register')
  })

  // NCC-REG-009
  it('NCC-REG-009 Verify Gender Dropdown Functionality', () => {

    cy.visit('https://ncc.vkes.co.id/register')

    cy.get('select#gender')
      .should('be.visible')

    cy.get('select#gender')
      .select('male')

    cy.get('select#gender')
      .should('have.value', 'male')
  })

   // NCC-REG-010
  it('NCC-REG-010 Verify Date of Birth Picker', () => {

    cy.visit('https://ncc.vkes.co.id/register')

    cy.get('input[type="date"]')
      .should('be.visible')
      .click()

    cy.get('input[type="date"]')
      .invoke('val', '2000-01-01')
      .trigger('change')

    cy.get('input[type="date"]')
      .should('have.value', '2000-01-01')
  })


  // NCC-REG-011
    it('NCC-REG-011 - Verify Terms and Privacy Policy Link', () => {

    cy.visit('https://ncc.vkes.co.id/register')

    // Ketentuan Layanan
    cy.contains(/Ketentuan Layanan/i)
      .should('have.attr', 'href')
      .then((href) => {
        cy.contains(/Ketentuan Layanan/i)
          .click({ force: true })

        cy.url({ timeout: 10000 })
          .should('include', href)
      })

    // Kembali ke Register
    cy.visit('https://ncc.vkes.co.id/register')

    // Kebijakan Privasi
    cy.contains(/Kebijakan Privasi Data NCC/i)
      .should('have.attr', 'href')
      .then((href) => {
        cy.contains(/Kebijakan Privasi Data NCC/i)
          .click({ force: true })

        cy.url({ timeout: 10000 })
          .should('include', href)
      })

  })


  // NCC-REG-012
  it('NCC-REG-012 Verify Placeholder and Label Display', () => {

    cy.visit('https://ncc.vkes.co.id/register')

    cy.get('input[placeholder="Wira Pradana"]')
      .should('be.visible')

    cy.get('input[type="date"]')
      .should('be.visible')

    cy.get('input[placeholder="name@domain.com"]')
      .should('be.visible')

    cy.get('input[placeholder="08123456xxx"]')
      .should('be.visible')

    cy.get('input[placeholder="Minimal 8 karakter"]')
      .should('be.visible')

    cy.get('select#gender')
      .should('be.visible')
  })


  // NCC-REG-013
  it('NCC-REG-013 Verify Required Field Validation Message', () => {

    cy.visit('https://ncc.vkes.co.id/register')

    // Nama sengaja dikosongkan

    cy.get('select#gender')
      .select('male')

    cy.get('input[type="date"]')
      .type('2000-01-01')

    cy.get('input[placeholder="name@domain.com"]')
      .type(`required${Date.now()}@example.com`)

    cy.get('input[placeholder="08123456xxx"]')
      .type('081234567890')

    cy.get('input[placeholder="Minimal 8 karakter"]')
      .type('Cypress123')

    cy.get('input[type="checkbox"]')
      .first()
      .check({ force: true })

    cy.contains('button', 'Buat Akun Pasien')
      .click({ force: true })

    cy.url()
      .should('include', '/register')
  })


  // NCC-REG-014
  it('NCC-REG-014 Check Maximum Character Limit in WhatsApp Number', () => {

    cy.visit('https://ncc.vkes.co.id/register')

    const nomorPanjang =
      '0812345678901234567890123456789012345678901234567890'

    cy.get('input[placeholder="08123456xxx"]')
      .type(nomorPanjang)

    cy.get('input[placeholder="08123456xxx"]')
      .invoke('attr', 'maxlength')
      .then((maxLength) => {

        if (maxLength) {
          cy.get('input[placeholder="08123456xxx"]')
            .invoke('val')
            .then((value) => {
              expect(value.length)
                .to.be.at.most(Number(maxLength))
            })
        }

      })
  })


  // NCC-REG-015
  it('NCC-REG-015 Verify Input Trims Leading and Trailing Spaces', () => {

    cy.visit('https://ncc.vkes.co.id/register')

    cy.get('input[placeholder="Wira Pradana"]')
      .type('   Cypress Test Patient   ')

    cy.get('input[placeholder="Wira Pradana"]')
      .invoke('val')
      .then((value) => {
        expect(value.trim())
          .to.equal('Cypress Test Patient')
      })
  })


  // NCC-REG-016
  it('NCC-REG-016 Verify Duplicate WhatsApp Number Registration', () => {

    cy.visit('https://ncc.vkes.co.id/register')

    cy.get('input[placeholder="Wira Pradana"]')
      .type('Cypress Duplicate Patient')

    cy.get('select#gender')
      .select('male')

    cy.get('input[type="date"]')
      .type('2000-01-01')

    cy.get('input[placeholder="name@domain.com"]')
      .type(`duplicate${Date.now()}@example.com`)

    cy.get('input[placeholder="08123456xxx"]')
      .type('081234567890')

    cy.get('input[placeholder="Minimal 8 karakter"]')
      .type('Cypress123')

    cy.get('input[type="checkbox"]')
      .first()
      .check({ force: true })

    cy.contains('button', 'Buat Akun Pasien')
      .click({ force: true })

    cy.wait(2000)

    cy.url()
      .should('include', '/register')
  })


  // NCC-REG-017
  it('NCC-REG-017 Verify Successful Redirect After Registration', () => {

    cy.visit('https://ncc.vkes.co.id/register')

    cy.get('input[placeholder="Wira Pradana"]')
      .type('Cypress Success Patient')

    cy.get('select#gender')
      .select('male')

    cy.get('input[type="date"]')
      .type('2000-01-01')

    cy.get('input[placeholder="name@domain.com"]')
      .type(`success${Date.now()}@example.com`)

    cy.get('input[placeholder="08123456xxx"]')
      .type('081234567892')

    cy.get('input[placeholder="Minimal 8 karakter"]')
      .type('Cypress123')

    cy.get('input[type="checkbox"]')
      .first()
      .check({ force: true })

    cy.contains('button', 'Buat Akun Pasien')
      .click({ force: true })

    cy.wait(3000)

    // Setelah berhasil registrasi diarahkan ke Dashboard
    cy.url({ timeout: 10000 })
      .should('include', '/patient')
  })

})