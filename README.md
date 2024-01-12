# Empowerkids Complaint Portal

## About the Project
I created the Empowerkids Complaint Portal to empower children and give them a voice. As an advocate for children's rights and well-being, I was disheartened to see many instances where children's concerns went unheard or were dismissed due to their young age and lack of resources. So, I envisioned a platform that would allow them to speak up.

The portal provides a safe, supportive and non-judgmental space for children to voice their grievances. Children can file complaints through the portal to bring it to light whether it is an issue at school, at home or in their community. Filing the complaint itself can be an act of catharsis and comfort for the child.

## How It Will Help Children:

- Gives them an avenue to voice grievances affecting them
- Experts will listen, support them and stand up for them
- Complaints will be escalated to higher authorities if unresolved
- Raises awareness on issues disproportionately affecting kids
- Drives better policies and social change to protect children
- Helps those facing unjust situations and unable to speak up

# Technical Details

## Front-end
The front end of this platform is built using **React.js** in conjunction with **Material UI** to ensure a modern and intuitive user interface.

## Back-end
I have leveraged **Firebase** to create a robust back-end infrastructure. Google **Firestore** serves as the database, offering a flexible foundation for future expansions and easy addition of new agents or functionalities.

## Hosting
The platform is hosted on **Netlify**, a powerful cloud platform that facilitates seamless deployment, instant scaling, and hassle-free hosting without constant supervision.

# User Flow

- Kids/Parents can file new complaints providing type and description
- Kids/Parents can view the status of their complaints in the personal dashboard
- Complaints get assigned to the EmpowerKids team first
- They will verify the Authenticity of the case, then escalate to Legal Expert
- The legal expert will reach out to the user and try to solve the case and provide insights into the case
- If unresolved or need more help, it will be escalated to Government Official
- Officers can update status and remarks for complaints
- Visitors can view anonymized complaints and status

# Features

### Home Page
* It is the home page of our website with basic information.
* It features a Notification / Circulars section with the latest updates from Officers.

### Special Features
* All Data is live fetched and updated improving user experience.
* This is a single-page website with no refresh on page change enhancing page load speed.
* Student Dashboard and Profile page implementing personalization.
* Strict security rules with proper feedback messages using react-toasty.
* Responsive website with accessibility features.
* If officers 1 and 2 are not able to resolve this within 7 days, the complaint request will be promoted automatically to the next officer.
* Officer can send out new Notification / Circulars which are shown on the Home Page.

### Data Table Used
* It is used to display data in the form of a table.
* Easily sort your rows based on one or several criteria.
* Easily filter your rows based on one or several criteria using Search Field.
* Easily paginate your rows and only fetch what you need.
* Easily export the rows in various file formats such as CSV, Excel, or PDF.
* Quick peek of the issue without having to open the info dialogue box.

### Student Dashboard
* Student can Raise a New Complaint by entering 'Complaint Type' and 'Complaint Description'.
* Students can see the 'My Complaints' section with all complaints lodged by him/her in the Data Table.
* Info icon opens dialog box for additional information like Issued To, Remarks etc.

### Officer Dashboard
* Features the same UI for three different officers - EmpowerKids Team, Legal Expert, and Government Official.
* Data Table contains complaints issued to them only.
* Info icon opens dialogue box including following features-
    * The officer can set the status of the complaint as - Resolved, Pending, or Declined.
    * The EmpowerKids Team can escalate the complaint to the Legal Expert and the Legal Expert can escalate the complaint to the Government Official.
    * The officer can add remarks for each complaint with additional information.
* Officer can add/delete Notification / Circulars from the dashboard which is shown on the Home Page. 

### Admin Dashboard
* Admin Data Table features all account details.
* Admin can change any account type to - Student, EmpowerKids Team, Legal Expert, Government Official, Admin.

### All Complaints
* Every visitor is able to see all complaints.
* User can filter complaints according to Resolved, Pending, or Declined.
* All Data Talbe features are available.
* Info icon opens dialogue box for additional information with remarks from Officer.

### Contact Us
* It contains information regarding contacts of the EmpowerKids Team.

## Login Credentials
#### Admin Account:
Username: empowerkids@gmail.com

Password: 12345678

#### Kid Account :
Username: kid@gmail.com

Password: 12345678

#### EmpowerKids Team Account:
Username: empowerkidsteam@gmail.com

Password: 12345678

#### Legal Expert Account:
Username: Legalexpert@gmail.com

Password: 12345678

#### Government Official Account:
Username: governmentofficial@gmail.com

Password: 12345678


### Future Works/Planned Updates

- Implementing robust email validation mechanisms.
- Enabling users to upload supporting evidence or documents related to their complaints.
- Integrating multi-language support to cater to a diverse user base.
- Automated reminders for pending complaints or actions required from users or officers.


## Run Locally

Clone the project

```bash
  git clone https://github.com/Saravanakumar2003/EmpowerKids.git
```

Go to the project directory

```bash
  cd EmpowerKids
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## FAQ

#### Who can file complaints through the portal?
Any child facing issues at school, home or community that affect them.

#### What happens when a complaint is filed?
It gets manually reviewed by child rights experts who then guide, stand up and escalate the complaint on the child's behalf.

#### Does filing a complaint actually help resolve the issue?
Yes, the aim of the platform is to ultimately get each complaint resolved through appropriate guidance and escalation.

#### Are there any data privacy or security concerns?
The anonymity of children is maintained and the website is securely hosted on trusted platforms like Firebase and Netlify.

## Screenshots

#### Homepage
![App Screenshot](https://i.postimg.cc/pTm6RCjD/msedge-6i-ZKo7-UP2-T.png)

#### Kid Dashboard
![App Screenshot](https://i.postimg.cc/VLnWqp1S/msedge-vopt-VHC9ub.png)

#### Contact Us Page
![App Screenshot](https://i.postimg.cc/zGL52CtR/msedge-SElh-KNXZr-F.png)

#### Instructions to File a Complaint
![App Screenshot](https://i.postimg.cc/tJ74NL8L/msedge-2-KTOXx-Nt-UT.png)

