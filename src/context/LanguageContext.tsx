'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'th';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    en: {
        'landing.title': 'Find Your Perfect ',
        'landing.titleHighlight': 'Tech Product',
        'landing.subtitle': 'GearSense AI analyzes thousands of products to recommend the best smartphones, laptops, and gaming gear tailored to your budget and usage needs.',
        'landing.cta': 'Start Recommendation',
        'nav.home': 'Home',
        'nav.recommend': 'Recommend',
        'nav.history': 'History',
        'nav.dashboard': 'Dashboard',
        'nav.getStarted': 'Get Started',
        'product.why': 'Why it fits',
        'product.pros': 'Pros',
        'product.cons': 'Cons',
        'product.choose': 'Choose this',
        'product.askAi': 'Ask AI',
        'chat.discussing': 'Currently discussing:',
        'chat.askAnything': 'Ask me anything',
        'chat.placeholder': 'Ask about products...',
        'chat.defaultMsg': 'Tell me more about this product.',
        'results.title': 'Your Top Picks',
        'results.ready': 'AI Recommendations Ready',
        'results.basedOn': 'Based on your budget of {budget} for {usage} use',
        'results.noProducts': 'No Products Found',
        'results.tryAgain': 'Try Again',
        'results.modify': 'Modify Search',
        'results.newSearch': 'New Search',

        // Recommend Page
        'rec.title': 'Find the Perfect Tech Gear',
        'rec.subtitle': 'Tell us your needs and GearSense AI will recommend the best tech products for you.',
        'rec.powered': 'Powered by GearSense AI',
        'rec.step1.title': 'What are you looking for?',
        'rec.step1.desc': 'Select a product category to get started',
        'rec.step2.title': 'What\'s your budget?',
        'rec.step2.desc': 'Higher budgets allow more premium recommendations',
        'rec.step2.manual': 'Or enter manually:',
        'rec.step3.title': 'How will you use it?',
        'rec.step3.desc': 'This helps us recommend products that match your lifestyle',
        'rec.step4.title': 'Any preferences?',
        'rec.step4.desc': 'Optional settings to fine-tune your recommendations',
        'rec.back': 'Back',
        'rec.continue': 'Continue',
        'rec.getRecs': 'Get Recommendations',
        'rec.stepCount': 'Step {current} of {total}',

        // Dashboard
        'dash.title': 'Analytics Dashboard',
        'dash.subtitle': 'Track recommendation performance and user behavior',
        'dash.totRequests': 'Total Recommendations',
        'dash.avgResponse': 'Avg Response Time',
        'dash.mostReq': 'Most Requested',
        'dash.feedback': 'Feedback Rate',
        'dash.overTime': 'Recommendation Requests Over Time',
        'dash.popularCat': 'Product Category Popularity',
        'dash.usageType': 'Usage Type Distribution',
        'dash.budgetRange': 'Budget Range Distribution',

        // History
        'hist.title': 'Recommendation History',
        'hist.subtitle': 'View your past recommendation requests and results',
        'hist.filters': 'Filters:',
        'hist.allTypes': 'All Types',
        'hist.allUsage': 'All Usage',
        'hist.clear': 'Clear',
        'hist.noHistory': 'No history found',
        'hist.topPick': 'Top pick:',

        // Home Page
        'home.advisorBadge': 'AI-Powered Product Advisor',
        'home.howItWorks': 'How GearSense AI Works',
        'home.howItWorksDesc': 'Our intelligent system makes finding the right product simple and stress-free',
        'home.feat1.title': 'Smart AI Analysis',
        'home.feat1.desc': 'Our AI analyzes specifications, performance, and user reviews to find the perfect match for your needs.',
        'home.feat2.title': 'Budget Optimized',
        'home.feat2.desc': 'Get the best value within your budget. We consider price-performance ratio for every recommendation.',
        'home.feat3.title': 'Side-by-Side Comparison',
        'home.feat3.desc': 'See detailed comparisons with AI-generated pros, cons, and personalized explanations.',
        'home.stat1': 'Products Analyzed',
        'home.stat2': 'Avg. Response Time',
        'home.stat3': 'User Satisfaction',
        'home.stat4': 'Top Recommendations',
        'home.disclaimer': 'AI recommendations are based on product specifications and general information. Please verify specifications and prices before purchase.',
        'home.viewDash': 'View Dashboard',

        // Loading
        'load.aiProcessing': 'GearSense AI Processing',
        'load.processing': 'Processing...',
        'load.step1.msg': 'Analyzing your preferences...',
        'load.step1.desc': 'Understanding your requirements',
        'load.step2.msg': 'Scanning product database...',
        'load.step2.desc': 'Searching thousands of products',
        'load.step3.msg': 'Comparing specifications...',
        'load.step3.desc': 'Analyzing features and specs',
        'load.step4.msg': 'Finding the best matches...',
        'load.step4.desc': 'Scoring and ranking products',
        'load.step5.msg': 'Generating recommendations...',
        'load.step5.desc': 'AI creating explanations',
        'load.step6.msg': 'Finalizing suggestions...',
        'load.step6.desc': 'Almost ready!',

        // Recommend Options
        'step.type': 'Product Type',
        'step.budget': 'Budget',
        'step.usage': 'Usage',
        'step.prefs': 'Preferences',
        'type.phone': 'Smartphone',
        'type.phoneDesc': 'Find the best mobile device',
        'type.laptop': 'Laptop',
        'type.laptopDesc': 'Choose the right computer',
        'type.gaming': 'Gaming Gear',
        'type.gamingDesc': 'Get the best gaming accessories',
        'usage.gaming': 'Gaming',
        'usage.work': 'Work / Study',
        'usage.general': 'General Use',
        'pref.perf': 'Prioritize performance',
        'pref.perfDesc': 'Focus on speed and power',
        'pref.battery': 'Long battery life',
        'pref.batteryDesc': 'Extended usage time',
        'pref.light': 'Lightweight device',
        'pref.lightDesc': 'Easy to carry',
        'toast.reqAll': 'Please complete all required fields',
        'toast.aiStart': 'Starting AI analysis...',
        'toast.aiStartDesc': 'Finding the best products for you',
        'toast.reqType': 'Please select a product type',
        'toast.reqBudget': 'Please enter a budget of at least $100',
        'toast.reqUsage': 'Please select your primary usage',
        'toast.prodSel': 'Product selected!',
        'toast.prodSelDesc': 'Your feedback helps improve our recommendations',
        'chat.suggest1': 'Which one is best for gaming?',
        'chat.suggest2': 'Which has the best battery life?',
        'chat.suggest3': 'Compare option 1 and 2',
        'chat.suggest4': 'Best value for money?',
        'results.important': 'Important',
        'badge.bestPerf': 'Best Performance',
        'badge.bestBudget': 'Best Budget',
        'badge.balanced': 'Balanced Choice',
        'product.match': '{score}% match',
    },
    th: {
        'landing.title': 'ค้นหาอุปกรณ์เทคโนโลยีที่',
        'landing.titleHighlight': 'เหมาะกับคุณ',
        'landing.subtitle': 'GearSense AI วิเคราะห์สินค้าหลายพันรายการเพื่อแนะนำสมาร์ทโฟน แล็ปท็อป และอุปกรณ์เกมมิ่งที่ดีที่สุด ที่ปรับให้เหมาะกับงบประมาณและการใช้งานของคุณ',
        'landing.cta': 'เริ่มการแนะนำสินค้า',
        'nav.home': 'หน้าหลัก',
        'nav.recommend': 'แนะนำ',
        'nav.history': 'ประวัติ',
        'nav.dashboard': 'แดชบอร์ด',
        'nav.getStarted': 'เริ่มต้นใช้งาน',
        'product.why': 'เหตุผลที่แนะนำ',
        'product.pros': 'ข้อดี',
        'product.cons': 'ข้อจำกัด',
        'product.choose': 'เลือกสินค้านี้',
        'product.askAi': 'ถาม AI',
        'chat.discussing': 'กำลังพูดถึงสินค้า:',
        'chat.askAnything': 'ถามอะไรฉันก็ได้',
        'chat.placeholder': 'พิมพ์สอบถามเกี่ยวกับสินค้า...',
        'chat.defaultMsg': 'ช่วยบอกรายละเอียดเพิ่มเติมเกี่ยวกับสินค้านี้หน่อย',
        'results.title': 'สินค้าแนะนำอันดับต้นๆ ของคุณ',
        'results.ready': 'AI พร้อมแนะนำสินค้าแล้ว',
        'results.basedOn': 'อิงตามงบประมาณ {budget} สำหรับการใช้งาน {usage}',
        'results.noProducts': 'ไม่พบสินค้า',
        'results.tryAgain': 'ลองอีกครั้ง',
        'results.modify': 'แก้ไขการค้นหา',
        'results.newSearch': 'ค้นหาใหม่',

        // Recommend Page
        'rec.title': 'ค้นหาอุปกรณ์เทคโนโลยีที่เหมาะกับคุณ',
        'rec.subtitle': 'บอกความต้องการของคุณ แล้ว GearSense AI จะแนะนำสินค้าที่ดีที่สุดให้',
        'rec.powered': 'ขับเคลื่อนโดย GearSense AI',
        'rec.step1.title': 'คุณกำลังมองหาอะไรอยู่?',
        'rec.step1.desc': 'เลือกหมวดหมู่สินค้าเพื่อเริ่มต้น',
        'rec.step2.title': 'งบประมาณของคุณคือเท่าไหร่?',
        'rec.step2.desc': 'งบประมาณที่สูงขึ้นช่วยให้เราแนะนำสินค้าที่พรีเมียมได้มากขึ้น',
        'rec.step2.manual': 'หรือระบุเอง:',
        'rec.step3.title': 'คุณใช้งานประเภทไหน?',
        'rec.step3.desc': 'เพื่อช่วยให้เราแนะนำสินค้าที่เข้ากับไลฟ์สไตล์ของคุณ',
        'rec.step4.title': 'มีตัวเลือกเพิ่มเติมไหม?',
        'rec.step4.desc': 'การตั้งค่าเสริมเพื่อปรับแต่งผลลัพธ์การแนะนำให้ตรงใจ',
        'rec.back': 'ย้อนกลับ',
        'rec.continue': 'ขั้นตอนถัดไป',
        'rec.getRecs': 'ดูสินค้าแนะนำ',
        'rec.stepCount': 'ขั้นตอนที่ {current} จาก {total}',

        // Dashboard
        'dash.title': 'แดชบอร์ดข้อมูล',
        'dash.subtitle': 'ติดตามประสิทธิภาพการแนะนำสินค้าและพฤติกรรมผู้ใช้',
        'dash.totRequests': 'จำนวนสั่งทั้งหมด',
        'dash.avgResponse': 'เวลาตอบสนองเฉลี่ย',
        'dash.mostReq': 'ที่ค้นหาบ่อยสุด',
        'dash.feedback': 'อัตราผลตอบรับ',
        'dash.overTime': 'สถิติการขอคำแนะนำตามเวลา',
        'dash.popularCat': 'หมวดหมู่สินค้ายอดนิยม',
        'dash.usageType': 'สัดส่วนประเภทการใช้งาน',
        'dash.budgetRange': 'สัดส่วนช่วงงบประมาณ',

        // History
        'hist.title': 'ประวัติการขอคำแนะนำ',
        'hist.subtitle': 'ดูประวัติผลการแนะนำที่ผ่านมาของคุณ',
        'hist.filters': 'ตัวกรอง:',
        'hist.allTypes': 'ทุกหมวดหมู่',
        'hist.allUsage': 'ทุกการใช้งาน',
        'hist.clear': 'ล้างค่า',
        'hist.noHistory': 'ไม่พบประวัติ',
        'hist.topPick': 'แนะนำสูงสุด:',

        // Home Page
        'home.advisorBadge': 'ผู้ช่วยแนะนำสินค้าด้วย AI',
        'home.howItWorks': 'GearSense AI ทำงานอย่างไร',
        'home.howItWorksDesc': 'ระบบอัจฉริยะของเราช่วยให้การค้นหาสินค้าที่ใช่เป็นเรื่องง่ายและไร้กังวล',
        'home.feat1.title': 'วิเคราะห์ด้วย AI อัจฉริยะ',
        'home.feat1.desc': 'AI ของเราวิเคราะห์สเปค ประสิทธิภาพ และรีวิวผู้ใช้เพื่อหาสินค้าที่ตรงกับความต้องการของคุณที่สุด',
        'home.feat2.title': 'คุ้มค่าทุกงบประมาณ',
        'home.feat2.desc': 'ได้ความคุ้มค่าสูงสุดในงบที่คุณมี เราพิจารณาอัตราส่วนราคาต่อประสิทธิภาพสำหรับทุกการแนะนำ',
        'home.feat3.title': 'เปรียบเทียบชัดเจน',
        'home.feat3.desc': 'ดูการเปรียบเทียบโดยละเอียดพร้อมข้อดี ข้อสังเกต และคำอธิบายที่สร้างโดย AI',
        'home.stat1': 'สินค้าที่วิเคราะห์',
        'home.stat2': 'เวลาตอบสนอง',
        'home.stat3': 'ความพึงพอใจ',
        'home.stat4': 'สินค้าแนะนำ',
        'home.disclaimer': 'คำแนะนำจาก AI อ้างอิงจากสเปคสินค้าและข้อมูลทั่วไป โปรดตรวจสอบสเปคและราคาก่อนตัดสินใจซื้อ',
        'home.viewDash': 'เปิดหน้าแดชบอร์ด',

        // Loading
        'load.aiProcessing': 'ระบบ GearSense AI กำลังประมวลผล',
        'load.processing': 'กำลังประมวลผล...',
        'load.step1.msg': 'กำลังวิเคราะห์ความต้องการของคุณ...',
        'load.step1.desc': 'ทำความเข้าใจสิ่งที่คุณต้องการ',
        'load.step2.msg': 'กำลังค้นหาสินค้า...',
        'load.step2.desc': 'เทียบดูจากสินค้าหลายพันรายการ',
        'load.step3.msg': 'กำลังเปรียบเทียบสเปค...',
        'load.step3.desc': 'วิเคราะห์คุณสมบัติและสเปค',
        'load.step4.msg': 'วิเคราะห์หาสินค้าที่เหมาะสม...',
        'load.step4.desc': 'ให้คะแนนและจัดอันดับ',
        'load.step5.msg': 'กำลังสร้างคำแนะนำ...',
        'load.step5.desc': 'AI อธิบายเหตุผลการแนะนำ',
        'load.step6.msg': 'เตรียมข้อมูลขั้นตอนสุดท้าย...',
        'load.step6.desc': 'เกือบเสร็จแล้ว!',

        // Recommend Options
        'step.type': 'ประเภทสินค้า',
        'step.budget': 'งบประมาณ',
        'step.usage': 'การใช้งาน',
        'step.prefs': 'ตัวเลือกเสริม',
        'type.phone': 'สมาร์ทโฟน',
        'type.phoneDesc': 'ค้นหาอุปกรณ์พกพาที่ดีที่สุด',
        'type.laptop': 'แล็ปท็อป',
        'type.laptopDesc': 'เลือกคอมพิวเตอร์ที่ใช่',
        'type.gaming': 'อุปกรณ์เกมมิ่ง',
        'type.gamingDesc': 'สุดยอดอุปกรณ์เสริมสำหรับการเล่นเกม',
        'usage.gaming': 'เล่นเกม',
        'usage.work': 'ทำงาน / เรียน',
        'usage.general': 'ใช้งานทั่วไป',
        'pref.perf': 'เน้นประสิทธิภาพ',
        'pref.perfDesc': 'ให้ความสำคัญกับความเร็วและความแรง',
        'pref.battery': 'แบตเตอรี่อึดทนนาน',
        'pref.batteryDesc': 'ใช้งานได้ต่อเนื่องยาวนาน',
        'pref.light': 'น้ำหนักเบา',
        'pref.lightDesc': 'พกพาสะดวก',
        'toast.reqAll': 'กรุณากรอกข้อมูลที่จำเป็นทั้งหมด',
        'toast.aiStart': 'กำลังเริ่มวิเคราะห์ด้วย AI...',
        'toast.aiStartDesc': 'กำลังค้นหาสินค้าที่ดีที่สุดสำหรับคุณ',
        'toast.reqType': 'กรุณาเลือกประเภทสินค้า',
        'toast.reqBudget': 'กรุณาระบุงบประมาณอย่างน้อย $100',
        'toast.reqUsage': 'กรุณาเลือกการใช้งานหลัก',
        'toast.prodSel': 'เลือกสินค้าแล้ว!',
        'toast.prodSelDesc': 'ความคิดเห็นของคุณช่วยปรับปรุงคำแนะนำของเรา',
        'chat.suggest1': 'รุ่นไหนเล่นเกมดีที่สุด?',
        'chat.suggest2': 'รุ่นไหนแบตเตอรี่อึดที่สุด?',
        'chat.suggest3': 'เปรียบเทียบตัวเลือกที่ 1 และ 2',
        'chat.suggest4': 'รุ่นไหนคุ้มค่าเงินที่สุด?',
        'results.important': 'ข้อควรทราบ',
        'badge.bestPerf': 'ประสิทธิภาพสูงสุด',
        'badge.bestBudget': 'คุ้มค่าที่สุด',
        'badge.balanced': 'สมดุลที่สุด',
        'product.match': 'ตรงใจ {score}%',
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en');

    useEffect(() => {
        // Load from local storage on mount
        const savedLang = localStorage.getItem('languagePreference') as Language;
        if (savedLang && ['en', 'th'].includes(savedLang)) {
            setLanguageState(savedLang);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('languagePreference', lang);
    };

    const t = (key: string): string => {
        const langDict = translations[language] || translations.en;
        return (langDict as Record<string, string>)[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
