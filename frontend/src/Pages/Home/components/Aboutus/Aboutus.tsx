import HeaderSection from "../../../../Components/HeaderSection/HeaderSection";
import AboutusBox from "./AboutusBox";
import AboutusIcon from "./AboutusIcon";
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import CasesOutlinedIcon from '@mui/icons-material/CasesOutlined';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';

function Aboutus() {
  return (
    <div className="pt-24 sm:pt-40">
      <HeaderSection
        subject="مــا چه کمکی میتونیم بهت بکنیم"
        title="از شروع مسیر کنارتیم نمیذاریم آب تو دلت تکون بخوره"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-5">
        <AboutusBox
          title="تضمین کاملترین محتوا"
          desc="بزار خیالت راحت کنم توی دوره هامون به ریز ترین موارد پرداختیم بعداز دیدن این دوره نیاز به هیچ آموزش دیگه ای نداری."
        >
          <AboutusIcon icon={<AutoStoriesOutlinedIcon fontSize="large" />} color="bg-blue-500/20" iconColor="text-blue-500" />
        </AboutusBox>
        <AboutusBox
          title="پشتیبانی دائمی"
          desc="هرجا سوالی داشتی به مشکل خوردی بچه های تیم آمادن که مشکلت رو حل کنن تلاشمون اینه بدون نگرانی دوره رو کامل کنی."
        >
          <AboutusIcon icon={<QuestionAnswerOutlinedIcon fontSize="large" />} color="bg-amber-500/20" iconColor="text-amber-500" />
        </AboutusBox>
        <AboutusBox
          title="پروژه محور در راستای بازار کار"
          desc="کل تمرکز ما رو این هستش بعداز تموم شدن دوره شخص بتونه با اعتماد به نفس کامل پروژه بزنه واقدام کنه برای کسب درآمد."
        >
          <AboutusIcon icon={<CasesOutlinedIcon fontSize="large" />} color="bg-green-500/20" iconColor="text-green-500" />
        </AboutusBox>
        <AboutusBox
          title="سراغ حرفه ای ها رفتیم"
          desc="به جرعت میتونم بگم سخت گیرترین شرایط جذب مدرس داریم چون برامون مهمه محتوا خیلی ساده و روان بیان بشه که توی یادگیری به مشکل نخورید."
        >
          <AboutusIcon icon={<InventoryRoundedIcon fontSize="large" />} color="bg-red-500/20" iconColor="text-red-500" />
        </AboutusBox>
      </div>
    </div>
  );
}

export default Aboutus;
