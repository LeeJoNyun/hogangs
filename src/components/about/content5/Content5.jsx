import React, { useState } from 'react';
import Hobok from './Hobok';
import Hogang from './Hogang';

const Content5 = () => {
    const [activeTab, setActiveTab] = useState('hogang');

    return (
        <section id="about-content5">
            <div className="inner">
                <div className="dogTabs">
                    {/* 좌측 동그라미 탭 */}
                    <div className="tabBtn" aria-label="character tabs">
                        <button
                            className={activeTab === 'hogang' ? 'active' : ''}
                            onClick={() => setActiveTab('hogang')}
                            aria-current={activeTab === 'hogang'}
                        >
                            <img src="/about/hogangSmall.webp" alt="호강이" />
                        </button>
                        <button
                            className={activeTab === 'hobok' ? 'active' : ''}
                            onClick={() => setActiveTab('hobok')}
                            aria-current={activeTab === 'hobok'}
                        >
                            <img src="/about/hobokSmall.webp" alt="호복이" />
                        </button>
                    </div>

                    {/* 컨텐츠 */}
                    <div className="tabContent">
                        {activeTab === 'hogang' ? <Hogang /> : <Hobok />}
                    </div>
                </div>
            </div>

            <div className="banner" aria-hidden="true" />
        </section>
    );
};

export default Content5;
