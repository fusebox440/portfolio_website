# 🚀 Lakshya Khetan - Portfolio Website

A modern, responsive portfolio website showcasing full-stack development projects, machine learning expertise, and professional experience.

## 🌟 Features

- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **Loading Animation**: Smooth animated loading screen with particle effects
- **Project Showcase**: Interactive project cards with GitHub links and detailed modals
- **Contact Form**: Functional contact form with email integration
- **Modern UI**: Gradient backgrounds, smooth animations, and contemporary design
- **SEO Optimized**: Meta tags and structured data for better search visibility

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Bootstrap 5.1.3
- RemixIcon 2.5.0
- Font Awesome 6.0.0
- Isotope.js (Portfolio filtering)

### Backend
- Node.js
- Express.js
- Nodemailer (Email functionality)
- CORS middleware

## 📁 Project Structure

```
portfolio_website/
├── index_new.html          # Main HTML file
├── style_new.css           # Main stylesheet
├── main_new.js             # JavaScript functionality
├── server.js               # Express server
├── package.json            # Dependencies
├── .env.example            # Environment variables template
├── images/                 # Image assets
│   └── logo.jpg
├── my photo.jpg            # Profile picture
└── logo.jpg                # Site favicon
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm or yarn
- Gmail account (for contact form)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/fusebox440/portfolio_website.git
   cd portfolio_website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your actual values:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   PORT=3000
   NODE_ENV=production
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📧 Contact Form Setup

To enable the contact form functionality:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. **Update .env file** with your credentials

## 🌐 Deployment

### Heroku Deployment

1. **Create a Heroku app**
   ```bash
   heroku create your-app-name
   ```

2. **Set environment variables**
   ```bash
   heroku config:set EMAIL_USER=your-email@gmail.com
   heroku config:set EMAIL_PASS=your-app-password
   heroku config:set NODE_ENV=production
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set environment variables** in Vercel dashboard

### Netlify Deployment

1. **Build command**: `npm run build`
2. **Publish directory**: `/`
3. **Set environment variables** in Netlify dashboard

## 🔧 Customization

### Personal Information
Edit `index_new.html` to update:
- Personal details in the About section
- Education and experience information
- Project descriptions and links
- Contact information

### Styling
Modify `style_new.css` to customize:
- Color schemes and gradients
- Typography and spacing
- Animations and transitions
- Responsive breakpoints

### Projects
Update project information:
- Project cards in the Portfolio section
- Modal content for detailed views
- GitHub repository links
- Technology tags

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Loading Time**: < 2 seconds
- **Mobile Responsive**: All screen sizes supported
- **Cross-browser Compatible**: Chrome, Firefox, Safari, Edge

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Lakshya Khetan**
- GitHub: [@fusebox440](https://github.com/fusebox440)
- Email: lakshyakhetan00@gmail.com

## 🙏 Acknowledgments

- Inspired by modern portfolio design trends
- Bootstrap team for the responsive framework
- RemixIcon and Font Awesome for beautiful icons
- Express.js and Nodemailer communities

---

⭐ **Star this repo if you found it helpful!**