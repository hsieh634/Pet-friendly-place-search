import React from 'react';

const AnimatedDog: React.FC = () => {
    return (
        <>
            <style>{`
                .dog-walking {
                    width: 150px;
                    height: 150px;
                    margin: auto;
                }
                .dog-body {
                    animation: dog-body 0.5s step-end infinite;
                }
                .dog-head {
                    animation: dog-head 0.5s step-end infinite;
                }
                .dog-torso {
                    animation: dog-torso 0.5s step-end infinite;
                }
                .dog-front-legs {
                    animation: dog-front-legs 0.5s step-end infinite;
                }
                .dog-back-legs {
                    animation: dog-back-legs 0.5s step-end infinite;
                }
                .dog-tail {
                    animation: dog-tail 0.2s linear infinite;
                }

                @keyframes dog-body {
                    from { transform: translateY(0); }
                    to { transform: translateY(1.5px); }
                }
                @keyframes dog-head {
                    from, to { transform: rotate(0deg); }
                    25%, 75% { transform: rotate(5deg); }
                    50% { transform: rotate(-2.5deg); }
                }
                @keyframes dog-torso {
                    from, to { transform: rotate(0deg); }
                    50% { transform: rotate(-2.5deg); }
                }
                @keyframes dog-front-legs {
                    from, to {
                        stroke-dasharray: 12 50;
                        stroke-dashoffset: 0;
                    }
                    50% {
                        stroke-dasharray: 12 50;
                        stroke-dashoffset: -16;
                    }
                }
                @keyframes dog-back-legs {
                    from, to {
                        stroke-dasharray: 12 50;
                        stroke-dashoffset: -16;
                    }
                    50% {
                        stroke-dasharray: 12 50;
                        stroke-dashoffset: 0;
                    }
                }
                @keyframes dog-tail {
                    from { transform: rotate(-5deg); }
                    to { transform: rotate(5deg); }
                }
            `}</style>
            <svg viewBox="0 0 100 100" className="dog-walking">
                <g className="dog-body" transform="translate(5, 10)">
                    <g className="dog-head" transform-origin="30 40">
                        <path fill="#433732" stroke="#433732" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" d="M22,32 V26 C22,23 25,22 28,24 C30,26 31,30 31,32 V34 C31,37 32,40 35,40 H45 V35 H40 C35,35 34,30 32,28 C30,26 28,26 26,28 L25,32" />
                        <circle fill="#FFF" cx="30" cy="32" r="2" />
                    </g>
                    <g className="dog-torso" transform-origin="45 45">
                        <path fill="#6B5B54" stroke="#433732" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" d="M35,40 C35,35 45,35 45,40 V50 C45,55 55,55 55,50 V45 C55,40 65,40 65,45 V55 C65,65 55,65 55,55 L52,50" />
                    </g>
                    <g className="dog-tail" transform-origin="65 55" transform="translate(0, 0) rotate(0)">
                        <path fill="none" stroke="#433732" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" d="M65,55 Q70,50 75,55" />
                    </g>
                </g>
                <g className="dog-legs" transform="translate(5, 10)">
                    <g className="dog-front-legs">
                        <path fill="none" stroke="#6B5B54" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" d="M42,55 V65 L40,70 M52,58 V68 L50,73" />
                    </g>
                    <g className="dog-back-legs">
                        <path fill="none" stroke="#6B5B54" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" d="M42,55 V65 L40,70 M52,58 V68 L50,73" transform="translate(15, -5)" />
                    </g>
                </g>
            </svg>
        </>
    );
};

export default AnimatedDog;
