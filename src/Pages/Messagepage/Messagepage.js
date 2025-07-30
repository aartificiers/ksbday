import React, { useState } from 'react';
import './messagepage.scss';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router';

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

const Messagepage = () => {
    const [visibleCount, setVisibleCount] = useState(0);
    const navigate=useNavigate();

    const handleClick = () => {
        setVisibleCount((prev) => Math.min(prev + 1, 5));
        if(visibleCount >=5){
            navigate("/bday");
   
        }
    };

    const messages=[
        {
            id:0,
            msg:"Every day I spend with you reminds me how lucky I am. Your smile, your strength, your kindness."
        },
        {
            id:1,
            msg:"No matter what life throws at us, I want you to know I’m always here — cheering for you"
        },
        {
            id:3,
            msg:"You amaze me in the little things — the way you care, the way you think, the way you light up a room."
        },
        {
            id:4,
            msg:"Being with you feels like home."
        },
        {
            id:5,
            msg:"May this Birthday be your best birthdays of all My love "
        },

    ]


    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
            <div className="mymesage">
                <div className="msg-wrap">

                    <div className="envelop">
                        <div className="env-wrap">
                            <div className="envelop-head" onClick={handleClick}></div>

                            {[1, 2, 3, 4, 5].map((num) => (
                                <div
                                    key={num}
                                    className={`msgs m${num} ${visibleCount >= num ? 'visible' : ''}`}
                                >
                                    <FaHeart color='red' /> {messages[num-1]?.msg}
                                </div>
                            ))}
                        </div>
                    </div>
                    {visibleCount >=4 ?? <NavLink to={"/bday"} className={"ltsgo"}>Lets Go !!</NavLink>}
                    
                </div>
            </div>

        </motion.div>

    )
}

export default Messagepage



