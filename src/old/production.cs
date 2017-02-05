/**
 * Created by Bombassd on 05.02.2017.
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace UndStrom
{
    public static class ProdListen
{
    public static bool NewEconomy = false;

    private static Dictionary<int, int> mPpGrundprod = new Dictionary<int, int>();
    private static Dictionary<int, int> mPpProdAnAkku = new Dictionary<int, int>();
    private static Dictionary<int, int> mAkkuProd = new Dictionary<int, int>();
    private static Dictionary<int, int> mRefGrundprod = new Dictionary<int, int>();
    private static Dictionary<int, int> mRefProdAnPp = new Dictionary<int, int>();
    private static Dictionary<int, int> mRefPpProd = new Dictionary<int, int>();

    private static Dictionary<int, int> mPpGrundprodNewEconomy = new Dictionary<int, int>();
    private static Dictionary<int, int> mPpProdAnAkkuNewEconomy = new Dictionary<int, int>();
    private static Dictionary<int, int> mAkkuProdNewEconomy = new Dictionary<int, int>();
    private static Dictionary<int, int> mRefGrundprodNewEconomy = new Dictionary<int, int>();
    private static Dictionary<int, int> mRefProdAnPpNewEconomy = new Dictionary<int, int>();
    private static Dictionary<int, int> mRefPpProdNewEconomy = new Dictionary<int, int>();

    private static Dictionary<int, int> mSammlerGrundprod = new Dictionary<int, int>();
    private static Dictionary<int, int> mSammlerProdAnSilo = new Dictionary<int, int>();
    private static Dictionary<int, int> mSiloProdAnSammler = new Dictionary<int, int>();

    private static Dictionary<int, int> mSammlerGrundprodNewEconomy = new Dictionary<int, int>();
    private static Dictionary<int, int> mSammlerProdAnSiloNewEconomy = new Dictionary<int, int>();
    private static Dictionary<int, int> mSiloProdAnSammlerNewEconomy = new Dictionary<int, int>();



    public static void GebäudeÜberprüfen(Layouts layout, fHaupt f)
{
    if (layout != null)
{
    List<Gebäude> g = layout.AktuellesLayout.Gebäude;
    string fehler = "";

    for (int i = 0; i < g.Count; i++)
{
    if ((g[i].mArt != Art.Blockiert
&& g[i].mArt != Art.Kris
&& g[i].mArt != Art.Tib
&& g[i].mArt != Art.Leer))
{
    if(g[i].mLevel > 75)
    fehler += f.GetSprache("Nur Gebäude von Level 1 bis 75 verfügbar.\r\n\r\nArt: " + g[i].mArt.ToString() + "  Level: " + g[i].mLevel + "\r\n\r\n",
    "Unknown building level found! Building:\r\n\r\n" + g[i].mArt.ToString() + " Level: " + g[i].mLevel + "\r\n\r\n");

    if(g[i].mLevel < 1)
    fehler += f.GetSprache("Falsches Gebäudelevel entdeckt.\r\n\r\nArt: " + g[i].mArt.ToString() + "  Level: " + g[i].mLevel + "\r\n\r\n", "Unknown building level found! Building:\r\n\r\n" + g[i].mArt.ToString() + " Level: " + g[i].mLevel + "\r\n\r\n");
}
}

    if(fehler.Length > 0)
        MessageBox.Show(fehler);
}
}


    private static void InsertValues(Dictionary<int, int> dic, int[] values)
    {
        for (int i = 0; i < values.Length; i++)
        {
            dic.Add(i + 1, values[i]);
        }
    }

    public static int SammlerGrundprod(int sammlerLevel)
    {
        if (mSammlerGrundprod.Count == 0)
        {
            int[] values = new int[]{ 180, 240, 342, 468, 600, 746, 907, 1073, 1266, 1480, 1730, 1902, 2208, 2592, 3078, 3655, 4340, 5155, 6123, 7274, 8642, 10268,
            12201, 14500, 17233, 20484, 24350, 28947, 34416, 40922, 48661, 57869, 68825, 81862, 97375, 115837, 137809, 163962,
            195919, 234110, 279750, 334293, 399478, 477382, 570488, 681765, 814761, 973717, 1163704, 1390784, 1668941,
            2002729, 2403275, 2883930, 3460716, 4152859, 4983431, 5980117, 7176141, 8611369, 10333643, 12400371, 14880446,
            17856535, 21427842, 25713410, 30856093, 37027311, 44432774, 53319328, 63983194, 76779833, 92135800,
            110562960, 132675552 };

            InsertValues(mSammlerGrundprod, values);

            values = new int[]{ 240, 300, 432, 570, 735, 920, 1120, 1330, 1560, 1800, 2050, 2360, 2950, 3687, 4609, 5761, 7202, 9002, 11253, 14066, 17583,
            21979, 27474, 34342, 42928, 53660, 67075, 83844, 104805, 131006, 163757, 204697, 255871, 319839, 399799, 499749,
            624686, 780858, 976073, 1220091, 1525114, 1906392, 2382991, 2978738, 3723423, 4654279, 5817849, 7272311,
            9090389, 11362986, 14203733, 17754666, 22193333, 27741666, 34677083, 43346354, 54182942, 67728678, 84660848,
            105826060, 132282575, 165353218, 206691523, 258364404, 322955505, 403694381, 504617977, 630772471,
            788465589, 985581986, 1231977483, 1539971854, 1924964818, -2147483648, -2147483648 };

            InsertValues(mSammlerGrundprodNewEconomy, values);
        }


        if (NewEconomy && mSammlerGrundprodNewEconomy.ContainsKey(sammlerLevel))
        {
            return mSammlerGrundprodNewEconomy[sammlerLevel];
        }
        else if (!NewEconomy && mSammlerGrundprod.ContainsKey(sammlerLevel))
        {
            return mSammlerGrundprod[sammlerLevel];
        }
        else
        {
            return 0;
        }
    }

    public static int SammlerProdAnSilo(bool nebenSilo, int sammlerLevel)
    {
        if (mSammlerProdAnSilo.Count == 0)
        {
            int[] values = new int[]{ 50, 70, 104, 140, 180, 224, 272, 322, 380, 444, 520, 570, 662, 777, 923, 1096, 1302, 1546, 1837, 2182, 2592, 3080, 3660, 4350, 5170,
            6145, 7305, 8684, 10325, 12276, 14598, 17360, 20647, 24558, 29212, 34751, 41342, 49188, 58775, 70233, 83925, 100288,
            119843, 143214, 171146, 204529, 244428, 292115, 349111, 417235, 500682, 600818, 720982, 865179, 1038214, 1245857,
            1495029, 1794035, 2152842, 2583410, 3100092, 3720111, 4464133, 5356960, 6428352, 7714023, 9256827, 11108193,
            13329832, 15995798, 19194958, 23033950, 27640740, 33168888, 39802665 };

            InsertValues(mSammlerProdAnSilo, values);


            values = new int[]{ 72, 90, 125, 170, 220, 275, 335, 400, 460, 530, 610, 710, 887, 1109, 1386, 1733, 2166, 2708, 3385, 4231, 5289, 6612, 8265, 10331,
            12914, 16143, 20179, 25224, 31530, 39412, 49266, 61582, 76978, 96222, 120278, 150348, 187935, 234919, 293649,
            367061, 458826, 573533, 716916, 896145, 1120182, 1400228, 1750285, 2187856, 2734820, 3418525, 4273157, 5341446,
            6676807, 8346009, 10432512, 13040640, 16300800, 20376000, 25470000, 31837501, 39796876, 49746095, 62182619,
            77728274, 97160342, 121450428, 151813035, 189766294, 237207868, 296509835, 370637293, 463296617, 579120771,
            723900964, 904876205 };

            InsertValues(mSammlerProdAnSiloNewEconomy, values);
        }

        if (nebenSilo)
        {

            if (NewEconomy && mSammlerProdAnSiloNewEconomy.ContainsKey(sammlerLevel))
            {
                return mSammlerProdAnSiloNewEconomy[sammlerLevel];
            }
            else if (!NewEconomy && mSammlerProdAnSilo.ContainsKey(sammlerLevel))
            {
                return mSammlerProdAnSilo[sammlerLevel];
            }
            else
            {
                return 0;
            }
        }
        else
            return 0;
    }

    public static int SiloProdAnSammler(bool nebenSammler, int siloLevel)
    {
        if (mSiloProdAnSammler.Count == 0)
        {
            int[] values = new int[]{ 33, 47, 69, 93, 120, 149, 181, 215, 253, 296, 347, 380, 441, 518, 615, 730, 867, 1030, 1223, 1453, 1727, 2052, 2438, 2897, 3443, 4093,
            4866, 5784, 6877, 8177, 9724, 11564, 13753, 16358, 19458, 23148, 27539, 32765, 39151, 46783, 55903, 66803, 79829,
            95397, 114003, 136240, 162817, 194582, 232548, 277926, 333512, 400214, 480257, 576309, 691571, 829885, 995862,
            1195035, 1434042, 1720850, 2065020, 2478024, 2973629, 3568355, 4282026, 5138432, 6166118, 7399342, 8879210,
            10655052, 12786063, 15343275, 18411931, 22094317, 26513180 };

            InsertValues(mSiloProdAnSammler, values);

            values = new int[]{ 72, 90, 125, 170, 220, 275, 335, 400, 460, 530, 610, 710, 887, 1109, 1386, 1733, 2166, 2708, 3385, 4231, 5289, 6612, 8265, 10331,
            12914, 16143, 20179, 25224, 31530, 39412, 49266, 61582, 76978, 96222, 120278, 150348, 187935, 234919, 293649,
            367061, 458826, 573533, 716916, 896145, 1120182, 1400228, 1750285, 2187856, 2734820, 3418525, 4273157, 5341446,
            6676807, 8346009, 10432512, 13040640, 16300800, 20376000, 25470000, 31837501, 39796876, 49746095, 62182619,
            77728274, 97160342, 121450428, 151813035, 189766294, 237207868, 296509835, 370637293, 463296617, 579120771,
            723900964, 904876205 };

            InsertValues(mSiloProdAnSammlerNewEconomy, values);
        }

        if (nebenSammler)
        {
            if (NewEconomy && mSiloProdAnSammlerNewEconomy.ContainsKey(siloLevel))
            {
                return mSiloProdAnSammlerNewEconomy[siloLevel];
            }
            else if (!NewEconomy && mSiloProdAnSammler.ContainsKey(siloLevel))
            {
                return mSiloProdAnSammler[siloLevel];
            }
            else
            {
                return 0;
            }
        }
        else
            return 0;
    }

    public static int PpGrundProd(int ppLevel)
    {
        if (mPpGrundprod.Count == 0)
        {
            int[] values = new int[]{ 120, 150, 216, 282, 360, 448, 544, 644, 760, 888, 1040, 1141, 1324, 1555, 1847, 2193, 2604, 3093, 3674, 4364, 5185, 6161, 7321,
            8700, 10340, 12290, 14610, 17368, 20650, 24553, 29197, 34721, 41295, 49117, 58425, 69502, 82685, 98377, 117551,
            140466, 167850, 200576, 239687, 286429, 342293, 409059, 488856, 584230, 698222, 834470, 1001364, 1201637,
            1441965, 1730358, 2076429, 2491715, 2990058, 3588070, 4305684, 5166821, 6200185, 7440223, 8928267, 10713921,
            12856705, 15428046, 18513655, 22216387, 26659664, 31991597, 38389916, 46067900, 55281480, 66337776,
            79605331 };

            InsertValues(mPpGrundprod, values);

            values = new int[]{ 120, 150, 198, 270, 360, 459, 560, 660, 780, 900, 1025, 1166, 1458, 1822, 2278, 2847, 3559, 4449, 5562, 6952, 8691, 10863, 13579,
            16974, 21218, 26523, 33153, 41442, 51803, 64753, 80942, 101177, 126472, 158090, 197612, 247015, 308769, 385962,
            482453, 603066, 753832, 942291, 1177863, 1472329, 1840412, 2300515, 2875644, 3594555, 4493194, 5616493,
            7020616, 8775770, 10969713, 13712141, 17140177, 21425221, 26781526, 33476908, 41846135, 52307669, 65384586,
            81730732, 102163416, 127704270, 159630337, 199537922, 249422402, 311778003, 389722504, 487153130,
            608941412, 761176766, 951470957, 1189338697, 1486673371 };

            InsertValues(mPpGrundprodNewEconomy, values);
        }


        if (NewEconomy && mPpGrundprodNewEconomy.ContainsKey(ppLevel))
        {
            return mPpGrundprodNewEconomy[ppLevel];
        }
        else if (!NewEconomy && mPpGrundprod.ContainsKey(ppLevel))
        {
            return mPpGrundprod[ppLevel];
        }
        else
        {
            return 0;
        }
    }

    public static int PpProdAnAkku(bool nebenAkku, int ppLevel)
    {
        if (mPpProdAnAkku.Count == 0)
        {
            int[] values = new int[]{ 60, 84, 125, 168, 216, 269, 326, 386, 456, 533, 624, 684, 794, 933, 1108, 1315, 1562, 1856, 2204, 2618, 3111, 3696, 4392, 5220,
            6204, 7374, 8766, 10421, 12390, 14732, 17518, 20833, 24777, 29470, 35055, 41701, 49611, 59026, 70531, 84279, 100710,
            120345, 143812, 171857, 205376, 245435, 293314, 350538, 418933, 500682, 600818, 720982, 865179, 1038214, 1245857,
            1495029, 1794035, 2152842, 2583410, 3100092, 3720111, 4464133, 5356960, 6428352, 7714023, 9256827, 11108193,
            13329832, 15995798, 19194958, 23033950, 27640740, 33168888, 39802665, 47763198 };

            InsertValues(mPpProdAnAkku, values);


            values = new int[]{ 72, 90, 120, 160, 215, 275, 335, 400, 460, 530, 610, 700, 875, 1093, 1367, 1708, 2136, 2670, 3337, 4172, 5215, 6519, 8149, 10186,
            12732, 15916, 19895, 24868, 31086, 38857, 48572, 60715, 75894, 94867, 118584, 148230, 185288, 231610, 289513,
            361891, 452364, 565455, 706819, 883524, 1104405, 1380506, 1725633, 2157041, 2696301, 3370377, 4212971, 5266214,
            6582768, 8228460, 10285575, 12856969, 16071211, 20089014, 25111268, 31389085, 39236357, 49045446, 61306807,
            76633509, 95791887, 119739859, 149674823, 187093529, 233866912, 292333640, 365417050, 456771312, 570964140,
            713705176, 892131470 };

            InsertValues(mPpProdAnAkkuNewEconomy, values);
        }

        if (nebenAkku)
        {

            if (NewEconomy && mPpProdAnAkkuNewEconomy.ContainsKey(ppLevel))
            {
                return mPpProdAnAkkuNewEconomy[ppLevel];
            }
            else if (!NewEconomy && mPpProdAnAkku.ContainsKey(ppLevel))
            {
                return mPpProdAnAkku[ppLevel];
            }
            else
            {
                return 0;
            }
        }
        else
            return 0;
    }


    public static int RefPpProd(bool refAnPp, int ppLevel)
    {
        if (mRefPpProd.Count == 0)
        {

            int[] values = new int[]{ 40, 56, 83, 112, 144, 179, 218, 258, 304, 355, 416, 484, 580, 696, 836, 1003, 1204, 1445, 1734, 2081, 2497, 2996, 3596, 4315, 5178,
            6214, 7456, 8948, 10738, 12885, 15462, 18555, 22266, 26719, 32063, 38476, 46171, 55406, 66487, 79784, 95741, 114890,
            137868, 165441, 198530, 238236, 285883, 343060, 411672, 494006, 592807, 711369, 853643, 1024371, 1229246,
            1475095, 1770114, 2124137, 2548965, 3058758, 3670510, 4404612, 5285534, 6342641, 7611169, 9133403, 10960084,
            13152101, 15782521, 18939025, 22726830, 27272196, 32726636, 39271963, 47126356 };

            InsertValues(mRefPpProd, values);

            values = new int[]{ 48, 60, 75, 100, 125, 160, 195, 230, 270, 315, 370, 430, 537, 671, 839, 1049, 1312, 1640, 2050, 2562, 3203, 4004, 5005, 6257, 7821,
            9777, 12221, 15276, 19095, 23869, 29837, 37296, 46620, 58275, 72844, 91056, 113820, 142275, 177843, 222304, 277880,
            347351, 434189, 542736, 678420, 848025, 1060031, 1325039, 1656299, 2070374, 2587968, 3234960, 4043700, 5054625,
            6318282, 7897852, 9872315, 12340394, 15425493, 19281866, 24102333, 30127916, 37659896, 47074870, 58843587,
            73554484, 91943106, 114928882, 143661103, 179576378, 224470473, 280588092, 350735115, 438418893, 548023617, };

            InsertValues(mRefPpProdNewEconomy, values);
        }


        if (NewEconomy && refAnPp && mRefPpProdNewEconomy.ContainsKey(ppLevel))
        {
            return mRefPpProdNewEconomy[ppLevel];
        }
        else if (!NewEconomy && refAnPp && mRefPpProd.ContainsKey(ppLevel))
        {
            return mRefPpProd[ppLevel];
        }
        else
            return 0;
    }

    public static int RefGrundProd(int refLevel)
    {
        if (mRefGrundprod.Count == 0)
        {
            int[] values = new int[]{ 120, 150, 216, 282, 360, 448, 544, 644, 760, 888, 1040, 1210, 1452, 1742, 2090, 2509, 3010, 3613, 4335, 5202, 6243, 7492, 8990,
            10788, 12946, 15535, 18642, 22370, 26845, 32214, 38657, 46388, 55666, 66799, 80159, 96191, 115429, 138515, 166218,
            199462, 239354, 287225, 344670, 413604, 496325, 595590, 714708, 857650, 1029180, 1235016, 1482019, 1778423,
            2134108, 2560929, 3073115, 3687739, 4425287, 5310344, 6372413, 7646895, 9176275, 11011530, 13213836, 15856603,
            19027924, 22833508, 27400210, 32880252, 39456303, 47347564, 56817076, 68180492, 81816590, 98179909,
            117815890 };

            InsertValues(mRefGrundprod, values);

            values = new int[]{ 120, 150, 180, 240, 315, 400, 485, 575, 680, 790, 924, 1080, 1350, 1687, 2109, 2636, 3295, 4119, 5149, 6437, 8046, 10058, 12572,
            15716, 19645, 24556, 30695, 38369, 47961, 59952, 74940, 93675, 117093, 146367, 182959, 228698, 285873, 357342,
            446677, 558346, 697933, 872417, 1090521, 1363151, 1703939, 2129924, 2662405, 3328006, 4160008, 5200010,
            6500013, 8125016, 10156271, 12695338, 15869173, 19836467, 24795583, 30994479, 38743099, 48428874, 60536093,
            75670117, 94587646, 118234557, 147793197, 184741496, 230926870, 288658588, 360823235, 451029044, 563786306,
            704732882, 880916103, 1101145128, 1376431411 };

            InsertValues(mRefGrundprodNewEconomy, values);
        }

        if (NewEconomy && mRefGrundprodNewEconomy.ContainsKey(refLevel))
        {
            return mRefGrundprodNewEconomy[refLevel];
        }
        else if (!NewEconomy && mRefGrundprod.ContainsKey(refLevel))
        {
            return mRefGrundprod[refLevel];
        }
        else
        {
            return 0;
        }
    }

    public static int RefProdAnPp(bool anPp, int refLevel)
    {
        if (mRefProdAnPp.Count == 0)
        {
            int[] values = new int[]{ 60, 84, 125, 168, 216, 269, 326, 386, 456, 533, 624, 726, 871, 1045, 1254, 1505, 1806, 2167, 2601, 3121, 3746, 4495, 5394, 6473,
            7767, 9321, 11185, 13422, 16107, 19328, 23194, 27833, 33399, 40079, 48095, 57714, 69257, 83109, 99731, 119677, 143612,
            172335, 206802, 248162, 297795, 357354, 428825, 514590, 617508, 741009, 889211, 1067054, 1280464, 1536557,
            1843869, 2212643, 2655172, 3186206, 3823447, 4588137, 5505765, 6606918, 7928301, 9513962, 11416754, 13700105,
            16440126, 19728151, 23673782, 28408538, 34090246, 40908295, 49089954, 58907945, 70689534 };

            InsertValues(mRefProdAnPp, values);

            values = new int[]{ 72, 90, 110, 145, 190, 240, 290, 345, 410, 475, 555, 650, 812, 1015, 1269, 1586, 1983, 2479, 3099, 3874, 4842, 6053, 7566, 9458,
            11823, 14779, 18474, 23092, 28865, 36082, 45102, 56378, 70473, 88091, 110114, 137642, 172053, 215066, 268833,
            336042, 420052, 525065, 656332, 820415, 1025519, 1281898, 1602373, 2002967, 2503708, 3129636, 3912045, 4890056,
            6112570, 7640713, 9550891, 11938614, 14923268, 18654085, 23317606, 29147008, 36433760, 45542200, 56927750,
            71159687, 88949609, 111187011, 138983764, 173729706, 217162132, 271452665, 339315832, 424144790, 530180988,
            662726235, 828407793 };

            InsertValues(mRefProdAnPpNewEconomy, values);
        }


        if (NewEconomy && anPp && mRefProdAnPpNewEconomy.ContainsKey(refLevel))
        {
            return mRefProdAnPpNewEconomy[refLevel];
        }
        else if (!NewEconomy && anPp && mRefProdAnPp.ContainsKey(refLevel))
        {
            return mRefProdAnPp[refLevel];
        }
        else
        {
            return 0;
        }
    }

    public static int AkkuProd(bool nebenPp, int akkuLevel)
    {
        if (mAkkuProd.Count == 0)
        {
            int[] values = new int[]{ 40, 56, 83, 112, 144, 179, 218, 258, 304, 355, 416, 456, 529, 622, 738, 877, 1041, 1237, 1469, 1745, 2074, 2464, 2928, 3480, 4136,
            4916, 5844, 6947, 8260, 9821, 11678, 13888, 16518, 19646, 23370, 27800, 33074, 39350, 47020, 56186, 67140, 80230,
            95874, 114571, 136917, 163623, 195542, 233692, 279289, 333788, 400545, 480655, 576786, 692143, 830571, 996686,
            1196023, 1435228, 1722273, 2066728, 2480074, 2976089, 3571307, 4285568, 5142682, 6171218, 7405462, 8886554,
            10663865, 12796638, 15355966, 18427160, 22112592, 26535110, 31842132 };

            InsertValues(mAkkuProd, values);

            values = new int[]{ 48, 60, 80, 110, 145, 185, 225, 265, 310, 355, 405, 465, 581, 726, 908, 1135, 1419, 1773, 2217, 2771, 3464, 4330, 5413, 6766, 8458,
            10572, 13216, 16520, 20650, 25812, 32265, 40332, 50415, 63019, 78774, 98467, 123084, 153855, 192319, 240399, 300499,
            375624, 469530, 586912, 733640, 917050, 1146313, 1432891, 1791114, 2238893, 2798616, 3498271, 4372838, 5466048,
            6832560, 8540701, 10675876, 13344845, 16681056, 20851321, 26064151, 32580189, 40725236, 50906545, 63633182,
            79541477, 99426847, 124283559, 155354448, 194193060, 242741326, 303426657, 379283322, 474104152, 592630190, };

            InsertValues(mAkkuProdNewEconomy, values);
        }

        if (nebenPp)
        {
            if (NewEconomy && mAkkuProdNewEconomy.ContainsKey(akkuLevel))
            {
                return mAkkuProdNewEconomy[akkuLevel];
            }
            else if (!NewEconomy && mAkkuProd.ContainsKey(akkuLevel))
            {
                return mAkkuProd[akkuLevel];
            }
            else
            {
                return 0;
            }
        }
        else
            return 0;
    }
}
}
