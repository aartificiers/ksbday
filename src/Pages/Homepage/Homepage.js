import { motion } from 'framer-motion';
import React from 'react';
import './homepage.scss';
import { NavLink } from 'react-router';

const pageVariants = {
    initial: { x: '100vw', opacity: 0 },
    in: { x: 0, opacity: 1 },
    out: { x: '-100vw', opacity: 0 },
};

const pageTransition = {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.6,
};


const Homepage = () => {
    return (

        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
            <div className="homepage">
                <div className="home-wrap">

                    <section className="wishes">
                        <div className="wish-wrap">
                            <motion.div className="pic-frame" variants={{
                                hidden: { x: 100, opacity: 0 },
                                visible: {
                                    x: 0,
                                    opacity: 1,
                                    transition: { type: 'tween', delay: 0.6, duration: 0.6 },
                                },
                            }}
                                initial={"hidden"}
                                animate={"visible"}>
                                <img src="https://res.cloudinary.com/artificier/image/upload/v1753912435/WhatsApp_Image_2025-07-31_at_3.21.46_AM_ghiqk7.jpg" alt="" />
                                <h3>1 . August</h3>
                            </motion.div>
                            <motion.div className="pic-frame" variants={{
                                hidden: { x: 100, opacity: 0 },
                                visible: {
                                    x: 0,
                                    opacity: 1,
                                    transition: { type: 'tween', delay: 1, duration: 0.6 },
                                },
                            }}
                                initial={"hidden"}
                                animate={"visible"}>
                                <img src="https://res.cloudinary.com/artificier/image/upload/v1753912440/WhatsApp_Image_2025-07-31_at_3.21.45_AM_1_atv02y.jpg" alt="" />
                                <h3>Special Day</h3>
                            </motion.div>
                            <motion.div className="pic-frame" variants={{
                                hidden: { x: 100, opacity: 0 },
                                visible: {
                                    x: 0,
                                    opacity: 1,
                                    transition: { type: 'tween', delay: 1.6, duration: 0.6 },
                                },
                            }}
                                initial={"hidden"}
                                animate={"visible"}>
                                <img src="https://res.cloudinary.com/artificier/image/upload/v1753912439/WhatsApp_Image_2025-07-31_at_3.21.45_AM_2_d8fyb4.jpg" alt="" />
                                <h3>Your day</h3>
                            </motion.div>

                            <NavLink to={'/mymsg'} className={"nxtbtn"}>Next</NavLink>
                            
                        </div>
                    </section>
                </div>
            </div>
        </motion.div >

    )
}

export default Homepage