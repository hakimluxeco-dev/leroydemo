import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './ServiceDetail.css';

const serviceContent = {
    upholstery: {
        title: "Furniture Upholstery",
        image: "/assets/couch.jpg",
        content: [
            "Our business has been around for years and we believe this speaks volumes for the quality and trust we offer to our customers. We cover every requirement for your furniture upholstery, including living room upholstery, dining room upholstery, and many more using our highly experienced upholsterers and sewing machinists. We are transparent in our approach – we have nothing to hide!",
            "Items that we work on include sofas, chairs, three-piece suites, footstools, ottomans, dining chairs, and bedroom chairs. We also specialize in bespoke items such as window seats, scatter cushions, and custom-designed sofas. No matter the scale of the project, we can help with all your household upholstery requirements.",
            "Our team is dedicated to providing high-quality craftsmanship, ensuring that every piece of furniture we touch is restored or created with the utmost care. We use a variety of high-quality materials to ensure durability and aesthetic appeal, tailored to each client's specific needs."
        ]
    },
    restoration: {
        title: "Furniture Restoration",
        image: "/assets/restoration.jpg",
        content: [
            "Whether it’s removing a wobble in the leg of your favourite chair or bringing back the shine to a rosewood table, our antique furniture restoration service will ensure that your treasured furniture can be enjoyed for years to come. In our busy furniture workshop, our team of skilled craftsmen use a combination of the latest technology and time-honoured traditional techniques to restore your furniture—be it dining tables, chests, sofas or chairs—while preserving its integrity.",
            "Some pieces simply cannot be replaced, and our team fully understands that. Furniture restoration at our Randburg company is often bittersweet; many of the pieces we receive are of high sentimental value and need to be treated with great care. Our craftsmen are here to help with advice as to the best course of action for each furniture restoration project, ensuring that the history and character of the piece are maintained.",
            "We offer five levels of restoration services, from a simple repair to keep the integrity of the piece to a full restoration to make a grand statement. Work is not an 'all or nothing' proposition; we are happy to work with you to ensure you get the level of restoration you want within your budget, whether it's a minor touch-up or a complete overhaul."
        ]
    },
    slipcovers: {
        title: "Slipcovers",
        image: "/assets/slipcovers.jpg",
        content: [
            "Loose or slip covers have been around for many years. They give the added advantage of being able to be removed for cleaning and repairs. They also let you have 2 sofas in one so you can have a summer and winter sofa. Let Leroy Designs upholsterers help with some exciting ideas! Also items which are usually unsightly or require protection such as BBQ’s, Air conditioning units (in winter), and water or gas bottles can be covered.",
            "Loose covers are an excellent solution to covering your chairs. We offer a bespoke service and your Loose Covers will be tailored to fit your suite perfectly. There are many benefits to having loose covers for your suite, including the versatility in being able to change the look of your sofa without changing the original upholstery. Also, the added benefit is that many of our fabrics are machine washable.",
            "We provide an in-home service where in most cases it will not be necessary for your furniture to leave your home, giving you minimal disruption during the make-up process. Whether you are looking to have custom-made loose covers for your furniture or require your lounge suite to be fully upholstered, our friendly customer service team provides free no-obligation advice and quotes."
        ]
    },
    cushions: {
        title: "Patio & Indoor Cushions",
        image: "/assets/leather.jpg", // Using leather as placeholder/closest match if specific patio img is missing
        content: [
            "Leroy Designs is proud to say that we have not received any call backs to repair furniture manufactured by us since we started manufacturing 10 years ago. We do repairs on all types of patio and indoor cushions. You do not have to own a Leroy Designs patio set to receive this service; we offer our repair services to anyone who owns wicker or patio furniture.",
            "We custom make indoor & outdoor furniture cushions to our customers’ exact specifications. We make any type of cushion you can think of. Whether you need to replace the foam and filling for the cushions on your old leather sofa or you need a new mattress for your caravan, we have you covered! We have 1,000s of different fabric samples to choose from at our showroom.",
            "When it comes to comfort, you choose the firmness of the foam to match your preference. Our high-density foam comes in three options: soft, medium, and firm. We also offer UV-treated fabrics for outside sunny deck areas that are washable and won't fade in the harsh sun, making them perfect for comfy armchairs on the porch."
        ]
    }
};

const ServiceDetail = () => {
    const { id } = useParams();
    const service = serviceContent[id];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!service) return <div className="container section-padding">Service not found</div>;

    return (
        <div className="service-detail-page">
            <div className="service-hero" style={{ backgroundImage: `url(${service.image})` }}>
                <div className="overlay"></div>
                <div className="container service-hero-content">
                    <h1>{service.title}</h1>
                </div>
            </div>

            <div className="container section-padding service-content">
                <Link to="/" className="back-link"><FaArrowLeft /> Back to Home</Link>
                <div className="content-wrapper">
                    {service.content.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                    ))}
                    <div className="cta-wrapper">
                        <a href="#contact" className="btn">Request a Quote</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
