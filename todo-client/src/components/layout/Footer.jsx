const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Project Todo version 1.01. All
          rights reserved to @ShevaitVerma
        </p>
      </div>
    </footer>
  );
};

export default Footer;
