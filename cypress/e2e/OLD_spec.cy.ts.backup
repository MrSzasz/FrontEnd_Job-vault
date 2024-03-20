const jobData = [
  {
    position: 'Desktop Support Technician',
    positionLink:
      'http://wikimedia.org/justo/in/blandit/ultrices/enim/lorem.html',
    company: 'Skipfire',
    description:
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
    requirements:
      'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
    extra:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    cv: 'https://samsung.com/pede/justo/lacinia/eget/tincidunt/eget/tempus.png',
    letter: 'http://wikia.com/turpis/nec/euismod/scelerisque.json',
  },
  {
    position: 'Junior Executive',
    positionLink:
      'http://theglobeandmail.com/pellentesque/viverra/pede/ac/diam/cras/pellentesque.png',
    company: 'Abatz',
    description:
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
    requirements:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    extra:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    cv: 'https://edublogs.org/in.js',
    letter: 'http://va.gov/velit/nec.jpg',
  },
  {
    position: 'Software Test Engineer IV',
    positionLink: 'https://webmd.com/turpis.html',
    company: 'Jaxspan',
    description:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    requirements:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    extra:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    cv: 'http://wp.com/sapien/cum/sociis/natoque.jsp',
    letter: 'https://behance.net/vitae/quam/suspendisse/potenti/nullam.json',
  },
  {
    position: 'Payment Adjustment Coordinator',
    positionLink: 'http://ustream.tv/erat/volutpat/in/congue.jpg',
    company: 'Katz',
    description:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    requirements:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    extra:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
    cv: 'https://salon.com/nisl/ut/volutpat/sapien/arcu/sed/augue.jpg',
    letter: 'http://homestead.com/in/porttitor/pede.js',
  },
  {
    position: 'Graphic Designer',
    positionLink:
      'https://gizmodo.com/suspendisse/potenti/in/eleifend/quam/a.js',
    company: 'Realbuzz',
    description:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    requirements:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    extra:
      'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    cv: 'http://ameblo.jp/neque/vestibulum/eget/vulputate/ut/ultrices/vel.html',
    letter: 'https://tiny.cc/ac/est/lacinia.js',
  },
]

describe('Job Vault e2e', () => {
  it('should create, edit and delete a job', () => {
    // It should render the main page
    cy.visit('/')

    // It should render the table
    const table = cy.get('div.rounded-md')
    table.should('be.visible')

    // It should show the loading state on initial render
    cy.get('.animate-pulse').contains(/loading/i)

    // it should show no data on initial render
    table.contains(/no jobs yet/i)

    // It should open the dialog on clicking the add button
    const addJobButton = cy.get('button').contains(/add job/i)
    addJobButton.click()

    // It should add the data to the form
    const positionInput = cy.get('input[placeholder="Position"]')
    const positionLinkInput = cy.get('input[placeholder="Position url"]')
    const companyInput = cy.get('input[placeholder="Company"]')
    const statusInput = cy.get('button[role="combobox"]')
    const optionInput = cy.get('option[value="rejected"]')
    const inputDescription = cy.get('textarea[placeholder="Job description"]')
    const inputRequirements = cy.get('textarea[placeholder="Job requirements"]')
    const inputExtras = cy.get('textarea[placeholder="Job extras"]')
    const inputCv = cy.get('input[placeholder="CV url"]')
    const inputLetter = cy.get('input[placeholder="Cover letter url"]')

    positionInput.type(jobData[0].position)
    positionLinkInput.type(jobData[0].positionLink, { delay: 0 })
    companyInput.type(jobData[0].company)
    statusInput.click()
    optionInput.click({ force: true })
    inputDescription.type(jobData[0].description, { delay: 0 })
    inputRequirements.type(jobData[0].requirements, { delay: 0 })
    inputExtras.type(jobData[0].extra, { delay: 0 })
    inputCv.type(jobData[0].cv, { delay: 0 })
    inputLetter.type(jobData[0].letter, { delay: 0 })

    // It should add new job to the table

    const submitButton = cy.get('button').contains(/submit/i)
    submitButton.click()
    cy.get('tr').contains(/technician/i)

    // It should persist the data in the table on reload
    cy.reload()
    const tableRow = cy.get('tr').contains(jobData[0].position)
    tableRow.should('be.visible')

    // It should show the job info
    const actionsButton = tableRow.get('button').contains('...')
    actionsButton.click()
    cy.get('div[role="menuitem"]')
      .contains(/show more/i)
      .click()
    cy.get('h2').contains(jobData[0].position)
    cy.get('.sr-only').click({ force: true })

    // It should show the edit button and open the dialog on clicking it
    actionsButton.click()
    cy.get('div[role="menuitem"]').contains(/edit/i).click()
    cy.get(`input[value=${jobData[0].company}]`).clear().type('Google')
    cy.get('button')
      .contains(/submit/i)
      .click()

    // It should edit the data in the table
    const editedTableRow = cy.get('tr').contains(/Google/i)
    editedTableRow.should('be.visible')

    // It should open the dialog on clicking the edit button and close it on clicking the cancel button
    actionsButton.click()
    cy.get('div[role="menuitem"]').contains(/edit/i).click()
    cy.get('button')
      .contains(/cancel/i)
      .click()

    // It should delete the job
    actionsButton.click()
    cy.get('div[role="menuitem"]')
      .contains(/delete/i)
      .click()

    // It should remove the job from the table
    cy.get('td[colspan="5"]').contains(/no jobs yet/i)
  })

  it.only('should filter jobs', () => {
    cy.visit('/')

    const addJobButton = cy.get('button').contains(/add job/i)
    addJobButton.click()

    cy.get('input[placeholder="Position"]').type(jobData[0].position)
    cy.get('input[placeholder="Position url"]').type(jobData[0].positionLink, {
      delay: 0,
    })
    cy.get('input[placeholder="Company"]').type(jobData[0].company)

    cy.get('textarea[placeholder="Job description"]').type(
      jobData[0].description,
      { delay: 0 },
    )
    cy.get('textarea[placeholder="Job requirements"]').type(
      jobData[0].requirements,
      { delay: 0 },
    )
    cy.get('textarea[placeholder="Job extras"]').type(jobData[0].extra, {
      delay: 0,
    })
    cy.get('input[placeholder="CV url"]').type(jobData[0].cv, { delay: 0 })
    cy.get('input[placeholder="Cover letter url"]').type(jobData[0].letter, {
      delay: 0,
    })

    cy.get('button')
      .contains(/submit/i)
      .click()

    cy.get('button')
      .contains(/add job/i)
      .click()

    cy.get('input[placeholder="Position"]').type(jobData[1].position)
    cy.get('input[placeholder="Position url"]').type(jobData[1].positionLink, {
      delay: 0,
    })
    cy.get('input[placeholder="Company"]').type(jobData[1].company)
    cy.get('textarea[placeholder="Job description"]').type(
      jobData[1].description,
      { delay: 0 },
    )
    cy.get('textarea[placeholder="Job requirements"]').type(
      jobData[1].requirements,
      { delay: 0 },
    )
    cy.get('textarea[placeholder="Job extras"]').type(jobData[1].extra, {
      delay: 0,
    })
    cy.get('input[placeholder="CV url"]').type(jobData[1].cv, { delay: 0 })
    cy.get('input[placeholder="Cover letter url"]').type(jobData[1].letter, {
      delay: 0,
    })

    cy.get('button')
      .contains(/submit/i)
      .click()

    // It should filter the data in the table
    cy.get('input[placeholder="Filter positions..."]').type(jobData[0].position)
    const tableRow = cy.get('tr').contains(jobData[0].position)
    tableRow.should('be.visible')
  })

  it.only('should sort jobs', () => {
    cy.visit('/')

    const addJobButton = cy.get('button').contains(/add job/i)
    addJobButton.click()

    cy.get('input[placeholder="Position"]').type(jobData[0].position)
    cy.get('input[placeholder="Position url"]').type(jobData[0].positionLink, {
      delay: 0,
    })
    cy.get('input[placeholder="Company"]').type(jobData[0].company)

    cy.get('textarea[placeholder="Job description"]').type(
      jobData[0].description,
      { delay: 0 },
    )
    cy.get('textarea[placeholder="Job requirements"]').type(
      jobData[0].requirements,
      { delay: 0 },
    )
    cy.get('textarea[placeholder="Job extras"]').type(jobData[0].extra, {
      delay: 0,
    })
    cy.get('input[placeholder="CV url"]').type(jobData[0].cv, { delay: 0 })
    cy.get('input[placeholder="Cover letter url"]').type(jobData[0].letter, {
      delay: 0,
    })

    cy.get('button')
      .contains(/submit/i)
      .click()

    cy.get('button')
      .contains(/add job/i)
      .click()

    cy.get('input[placeholder="Position"]').type(jobData[1].position)
    cy.get('input[placeholder="Position url"]').type(jobData[1].positionLink, {
      delay: 0,
    })
    cy.get('input[placeholder="Company"]').type(jobData[1].company)
    cy.get('button[role="combobox"]').click()
    cy.get('select').select('Rejected', { force: true })
    cy.get('textarea[placeholder="Job description"]').type(
      jobData[1].description,
      { delay: 0 },
    )
    cy.get('textarea[placeholder="Job requirements"]').type(
      jobData[1].requirements,
      { delay: 0 },
    )
    cy.get('textarea[placeholder="Job extras"]').type(jobData[1].extra, {
      delay: 0,
    })
    cy.get('input[placeholder="CV url"]').type(jobData[1].cv, { delay: 0 })
    cy.get('input[placeholder="Cover letter url"]').type(jobData[1].letter, {
      delay: 0,
    })

    cy.get('button')
      .contains(/submit/i)
      .click()
    cy.get('tr').eq(1).contains(jobData[0].position)

    // It should sort the data in the table
    cy.get('button')
      .contains(/status/i)
      .click()

    cy.get('tr').eq(1).contains(jobData[1].position)
  })

  it.only('should download jobs as CSV', () => {
    cy.visit('/')

    const addJobButton = cy.get('button').contains(/add job/i)
    addJobButton.click()

    cy.get('input[placeholder="Position"]').type(jobData[0].position)
    cy.get('input[placeholder="Position url"]').type(jobData[0].positionLink, {
      delay: 0,
    })
    cy.get('input[placeholder="Company"]').type(jobData[0].company)

    cy.get('textarea[placeholder="Job description"]').type(
      jobData[0].description,
      { delay: 0 },
    )
    cy.get('textarea[placeholder="Job requirements"]').type(
      jobData[0].requirements,
      { delay: 0 },
    )
    cy.get('textarea[placeholder="Job extras"]').type(jobData[0].extra, {
      delay: 0,
    })
    cy.get('input[placeholder="CV url"]').type(jobData[0].cv, { delay: 0 })
    cy.get('input[placeholder="Cover letter url"]').type(jobData[0].letter, {
      delay: 0,
    })

    cy.get('button')
      .contains(/submit/i)
      .click()

    // It should download the data in the table as a CSV file
    const downloadButton = cy.get('button').contains(/download/i)
    downloadButton.click()
    cy.get('div[role="menuitem"]').contains(/csv/i).click()
    cy.readFile('cypress/downloads/jobs.csv').then(data => {
      expect(data).to.include(jobData[0].position)
    })
  })

  it.only('should download jobs as JSON', () => {
    cy.visit('/')

    const addJobButton = cy.get('button').contains(/add job/i)
    addJobButton.click()

    cy.get('input[placeholder="Position"]').type(jobData[0].position)
    cy.get('input[placeholder="Position url"]').type(jobData[0].positionLink, {
      delay: 0,
    })
    cy.get('input[placeholder="Company"]').type(jobData[0].company)

    cy.get('textarea[placeholder="Job description"]').type(
      jobData[0].description,
      { delay: 0 },
    )
    cy.get('textarea[placeholder="Job requirements"]').type(
      jobData[0].requirements,
      { delay: 0 },
    )
    cy.get('textarea[placeholder="Job extras"]').type(jobData[0].extra, {
      delay: 0,
    })
    cy.get('input[placeholder="CV url"]').type(jobData[0].cv, { delay: 0 })
    cy.get('input[placeholder="Cover letter url"]').type(jobData[0].letter, {
      delay: 0,
    })

    cy.get('button')
      .contains(/submit/i)
      .click()

    // It should download the data in the table as a JSON file
    const downloadButton = cy.get('button').contains(/download/i)
    downloadButton.click()
    cy.get('div[role="menuitem"]').contains(/json/i).click()
    cy.readFile('cypress/downloads/jobs.json').then(data => {
      expect(data[0].position).to.eq(jobData[0].position)
    })
  })

  it.only('should upload jobs with drag and drop', () => {
    cy.visit('/')

    // It should show the upload dialog
    cy.get('button')
      .contains(/load data/i)
      .wait(1000)
      .click()

    // Upload button should be disabled
    cy.get('button')
      .contains(/load jobs/i)
      .should('be.disabled')

    // It should upload file
    cy.get('label[for="dropzone-file"]').selectFile(
      'cypress/downloads/jobs.csv',
      {
        action: 'drag-drop',
      },
    )
    cy.get('button')
      .contains(/load jobs/i)
      .click()

    // Job should be added to the table
    cy.get('tr').contains(jobData[0].position)
  })

  it('should upload jobs without drag and drop', () => {
    cy.visit('/')

    // It should show the upload dialog
    cy.get('button')
      .contains(/load data/i)
      .wait(1000)
      .click()

    // Upload button should be disabled
    cy.get('button')
      .contains(/load jobs/i)
      .should('be.disabled')

    // It should upload file
    cy.get('label[for="dropzone-file"]')
      .click()
      .selectFile('cypress/downloads/jobs.csv')
    cy.get('button')
      .contains(/load jobs/i)
      .click()

    // Job should be added to the table
    cy.get('tr').contains(jobData[0].position)
  })
})
