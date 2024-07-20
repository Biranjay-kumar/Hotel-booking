const Footer = () => {
	return (
	  <div className="bg-blue-700 py-10">
		<div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
		  <span className="text-3xl text-white font-bold tracking-tight mb-4 md:mb-0">
			<span className="text-yellow-300">Travel</span>
			<span className="text-white">Nest</span>
		  </span>
		  <div className="text-white font-bold tracking-tight flex flex-col md:flex-row gap-4 cursor-pointer">
			<a href="#" className="cursor-pointer">Privacy Policy</a>
			<a href="#" className="cursor-pointer">Terms of Service</a>
			<a href="#" className="">About Us</a>
			<a href="#" className="">Contact</a>
			<a href="#" className="">FAQ</a>
		  </div>
		</div>
	  </div>
	);
  };
  
  export default Footer;
  