import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  useMediaQuery,
  Drawer,
  Slide,
  Fade,
  Container,
  Avatar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
// Import Material UI icons
import {
  Gavel as GavelIcon,
  AccountBalance as AccountBalanceIcon,
  Build as BuildIcon,
  Spa as SpaIcon,
  BeachAccess as BeachAccessIcon,
  Devices as DevicesIcon,
  HealthAndSafety as HealthAndSafetyIcon,
  SportsSoccer as SportsSoccerIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

// Process sections data by splitting items into title and description
const sections = [
  {
    id: "legal",
    title: "الشق القانوني",
    icon: <GavelIcon />,
    items: [
      {
        title: "بلدية عصرية",
        description:
          "تشكيل بلدية عصرية تتألف من لجان تُحفّز دور الشباب، وتشارك أهالي القرية في الشأن العام البلدي لما فيه خير الجميع من دون استثناء.",
      },
      {
        title: "الالتزام بالنظام الرسمي",
        description:
          "تفتح البلدية أبوابها وفق النظام الرسمي، وتسجل طلبات المواطنين في قلم البلدية.",
      },
      {
        title: "المطالبة بحقوق المهجرين",
        description:
          "متابعة حقوق المهجرين العالقة في الوزارة المعنية، والعمل على استعادتها.",
      },
      {
        title: "إصدار رخص متطورة تواكب خصوصية العقارات الشائعة",
        description:
          "إصدار رخص بلدية تساهم في دعم وتعزيز مشاريع إعادة الإعمار.",
      },
      {
        title: "ترشيد الإنفاق العام",
        description:
          "اعتماد سياسة مالية رشيدة تقوم على ضبط النفقات العامة وتوجيه الموارد نحو الأولويات التنموية.",
      },
    ],
  },
  {
    id: "development",
    title: "الشق الإنمائي",
    icon: <BuildIcon />,
    items: [
      {
        title: "بناء مقرّ بلدي",
        description:
          "تنفيذ مشروع بناء المقرّ البلدي مع ترشيد الإنفاق العام، مما يتطلب الشفافية في العمل وتضافر جهود طاقات الاختصاص والخبرة، وتجهيز المقرّ بسيارات ومعدات خاصة، وبناء ملعب بلدية ومستوصف داخل المقر.",
      },
      {
        title: "مشاريع مياه وطاقات شمسية",
        description:
          "إنشاء بئر مياه، والاهتمام بشكل متواصل بطرقات القرية سواء لجهة تزفيت الطريق العام والشوارع الفرعية وكذلك ردم الحفر.",
      },
      {
        title: "ترقيم الشوارع",
        description:
          "ترقيم وتسمية الشوارع لتسهيل التنقل للقادمين إلى القرية والتوثيق الرسمي.",
      },
      {
        title: "مشاريع تنموية مستدامة",
        description:
          "استثمار الموارد الطبيعية، خصوصاً نهر بريح، في مشاريع تنموية مستدامة تعود بالفائدة إلى القرية وسكانها.",
      },
      {
        title: "تحديث مدرسة بريح الرسمية",
        description:
          "متابعة متطلبات المدرسة من تأمين وسائل تدفئة، وإنشاء مكتبة مدرسية متطورة، وتأمين أجهزة كمبيوتر في قاعة خاصة، واستضافة أساتذة لتسليط الضوء على مواضيع تكنولوجية كالذكاء الاصطناعي.",
      },
      {
        title: "تحسين مداخل البلدة",
        description: "تحسين وإصلاح جميع مداخل البلدة، مثل مدخل كفرنبرخ - بريح.",
      },
      {
        title: "تحسين البنية التحتية",
        description:
          "تأهيل شبكة الصرف الصحي والطرقات الزراعية وتحسينها بما يخدم مصلحة الأهالي.",
      },
      {
        title: "ترقيم وتسمية الطرق الرئيسية والفرعية",
        description:
          "وضع خطة شاملة لترقيم وتسمية الطرق لتعزيز تنظيم السير وتسهيل الخدمات اللوجستية والإدارية.",
      },
    ],
  },
  {
    id: "agriculture",
    title: "الشق الزراعي",
    icon: <SpaIcon />,
    items: [
      {
        title: "دعم الزراعة المحلية",
        description:
          "إنشاء هنغار مخصص للزراعة داخل باليتات، أو لزراعة أشجار مثمرة تُباع لاحقًا، مع تأمين معدّات للري والتنظيف والأدوية الزراعية.",
      },
      {
        title: "التعاون مع الخبراء",
        description:
          "التعاون مع مهندسين واختصاصيين زراعيين لتقديم الإرشادات والخطط الحديثة التي تعزز الإنتاج وتقليل التكاليف.",
      },
      {
        title: "الحصول على الدعم الزراعي",
        description:
          "التواصل مع الجمعيات الزراعية ووزارة البيئة لتأمين أشجار ونباتات مثمرة ومحلية تُقدّم مجانًا للمزارعين.",
      },
      {
        title: "التنمية الريفية المستدامة",
        description:
          "دعم المبادرات الزراعية الصغيرة وتحفيز المشاريع المستدامة التي تستثمر في الأراضي والموارد الطبيعية.",
      },
      {
        title: "تحسين المشهد الريفي",
        description:
          "إزالة النفايات من جوانب الطرق الزراعية، وزراعة العشب والورود، وإنشاء مقاعد استراحة لتعزيز الطابع الجمالي.",
      },
      {
        title: "إنشاء أقنية ري وبرك زراعية",
        description:
          "إنشاء أقنية وبرك مياه لدعم المشاريع الزراعية وتأمين مصادر ري فعّالة للمزارعين.",
      },
      {
        title: "ضم بريح إلى محمية أرز الشوف المحيط الحيوي",
        description:
          "العمل على ضم بريح إلى قرى محمية أرز الشوف لما لذلك من أثر بيئي واقتصادي إيجابي.",
      },
      {
        title: "إعادة تفعيل التعاونية الزراعية",
        description:
          "إعادة تفعيل عمل التعاونية لتقديم الدعم المباشر وتنظيم العمليات الزراعية.",
      },
      {
        title: "جلب منح للشباب",
        description:
          "محاولة تأمين منح مالية من المنظمات الدولية لدعم الشباب في إنشاء مشاريع زراعية وإنمائية.",
      },
      {
        title: "تفعيل خزان رأس الضيعة وإنشاء خزان طارئ",
        description:
          "تفعيل خزان المياه القائم وبناء خزان إضافي للحالات الطارئة لضمان استمرارية التأمين.",
      },
      {
        title: "فرز النفايات والاستفادة منها",
        description:
          "تطوير عملية فرز النفايات للاستفادة منها عبر بيع المواد القابلة لإعادة التدوير.",
      },
    ],
  },
  {
    id: "tourism",
    title: "الشق السياحي",
    icon: <BeachAccessIcon />,
    items: [
      {
        title: "مهرجان بريح الشوف",
        description:
          "تنظيم مهرجان سياحي كبير يتضمن حفلات وأنشطة متنوعة تجذب الزوار.",
      },
      {
        title: "دعم السياحة",
        description:
          "إقامة مشاريع وأسواق سياحية وأماكن للسهر، والترويج للقرية عبر مواقع التواصل الاجتماعي والبرامج التلفزيونية والإذاعات.",
      },
      {
        title: "وسائل النقل السياحي",
        description:
          "تشجيع وسائل نقل متنوعة للتنقل في الطبيعة واستكشاف المعالم.",
      },
    ],
  },
  {
    id: "digital",
    title: "التواصل الرقمي",
    icon: <DevicesIcon />,
    items: [
      {
        title: "منصة رقمية تفاعلية",
        description:
          "إنشاء موقع إلكتروني يتيح للمواطنين تقديم الاقتراحات ومتابعة أخبار البلدية ونشاطاتها.",
      },
    ],
  },
  {
    id: "health",
    title: "الشق الصحي",
    icon: <HealthAndSafetyIcon />,
    items: [
      {
        title: "التواصل مع الجمعيات ووزارة الصحة",
        description:
          "العمل ضمن مجموعات مختصة لتأمين مساعدات مادية وطبية لما يتيسر.",
      },
      {
        title: "دعم المستوصف",
        description:
          "تحويل المستوصف القائم إلى مركز رعاية صحية أولية بالتعاون مع وزارة الصحة لضمان خدمات طبية شاملة.",
      },
    ],
  },
  {
    id: "sports",
    title: "الشق الرياضي",
    icon: <SportsSoccerIcon />,
    items: [
      {
        title: "مهرجان رياضي سنوي",
        description:
          "تنظيم حدث رياضي سنوي لتحفيز الشباب على ممارسة الرياضة وتعزيز الوعي الصحي.",
      },
      {
        title: "دعم النشاطات الرياضية",
        description:
          "تشجيع النشاطات الرياضية بالتعاون مع وزارة الشباب والرياضة والاتحاد الرياضي.",
      },
    ],
  },
];
const members = [
  { id: 1, name: "طانوس سعد لحود", image: "/public/member1.jpg" },
  { id: 2, name: "نسيم عارف العلي", image: "/public/member10.jpg" },
  { id: 3, name: "وسام أمين يحي", image: "/public/member4.jpg" },
  { id: 11, name: "لودي هيكل حسون", image: "/public/member8.jpg" },
  { id: 4, name: "ماريا ميشال الدايه", image: "/public/member2.jpg" },
  { id: 5, name: "حلمي رامز أبي عز الدين", image: "/public/member6.jpg" },
  { id: 12, name: "محسن محمود محاسن", image: "/public/member9.jpg" },
  {
    id: 10,
    name: "شكري سعيد عدوان",
    image: "/member3.jpg",
  },
  { id: 7, name: "جيسي طانوس لحود", image: "/public/member11.jpg" },
  { id: 8, name: "جوزيف مارون خليل", image: "/public/member7.jpg" },
  { id: 9, name: "حنين سميح العلي", image: "/public/member5.jpg" },
  { id: 6, name: "حكمت رؤوف عبد السلام", image: "/public/member12.jpg" },
];
export default function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activeSection, setActiveSection] = useState("legal");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for AppBar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    setDrawerOpen(false);

    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Navigation menu component (for both desktop and mobile)
  const NavigationMenu = ({ variant }) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: variant === "drawer" ? "column" : "row",
        gap: variant === "drawer" ? 1 : 0,
      }}
    >
      {sections.map((section) => (
        <Button
          key={section.id}
          onClick={() => handleNavigate(section.id)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: variant === "drawer" ? "flex-start" : "center",
            gap: 1,
            fontSize:
              variant === "drawer"
                ? "0.95rem"
                : { sm: "0.75rem", md: "0.85rem" },
            fontWeight: activeSection === section.id ? "bold" : "normal",
            color:
              activeSection === section.id ? "primary.main" : "text.secondary",
            borderBottom:
              variant !== "drawer" && activeSection === section.id
                ? "2px solid"
                : "none",
            borderRight:
              variant === "drawer" && activeSection === section.id
                ? "3px solid"
                : "none",
            borderColor: "primary.main",
            borderRadius: 0,
            py: variant === "drawer" ? 1.5 : 2,
            px: variant === "drawer" ? 2 : 1.5,
            textAlign: "right",
            width: variant === "drawer" ? "100%" : "auto",
            "&:hover": {
              backgroundColor:
                variant === "drawer" ? "rgba(0, 0, 0, 0.04)" : "transparent",
              color: "primary.main",
            },
            transition: "all 0.2s ease",
          }}
          startIcon={React.cloneElement(section.icon, {
            sx: {
              fontSize: variant === "drawer" ? "medium" : "small",
              color:
                activeSection === section.id
                  ? "primary.main"
                  : "text.secondary",
            },
          })}
        >
          {section.title}
        </Button>
      ))}
    </Box>
  );

  return (
    <Box sx={{ minHeight: "100vh", direction: "rtl" }}>
      {/* AppBar with blur effect on scroll */}
      <AppBar
        position="sticky"
        elevation={scrolled ? 3 : 0}
        sx={{
          backdropFilter: scrolled ? "blur(10px)" : "none",
          bgcolor: scrolled ? "rgba(255, 255, 255, 0.9)" : "white",
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar
          sx={{ justifyContent: "space-between", px: { xs: 1, sm: 2, md: 3 } }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              src="/logo.png"
              alt="Logo"
              sx={{
                height: { xs: 60, sm: 70 },
                objectFit: "contain",
                transition: "all 0.3s ease",
              }}
            />
          </Box>

          {/* Navigation */}
          {isMobile ? (
            <IconButton
              onClick={toggleDrawer}
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{
                color: "primary.main",
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <NavigationMenu variant="desktop" />
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: "70%",
            maxWidth: 300,
            pt: 2,
            bgcolor: "white",
          },
        }}
      >
        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            px: 2,
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="primary.main"
            sx={{ fontWeight: "bold" }}
          >
            القائمة
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <NavigationMenu variant="drawer" />
      </Drawer>

      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
        {/* Hero Banner */}
        <Fade in={true} timeout={1000}>
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              borderRadius: { xs: 2, sm: 3 },
              overflow: "hidden",
              position: "relative",
              mb: { xs: 3, sm: 5 },
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <Box sx={{ position: "relative" }}>
              {/* Banner Image */}
              <Box
                component="img"
                src="/breeh.jpg"
                alt="Breih landscape"
                sx={{
                  width: "100%",
                  height: { xs: 200, sm: 300, md: 400 },
                  objectFit: "cover",
                  display: "block",
                }}
              />

              {/* Overlay with text */}
              <Box
                sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: { xs: 2, sm: 4 },
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: "700",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                    mb: { xs: 1, sm: 2 },
                    color: "white",
                    fontSize: {
                      xs: "1.6rem",
                      sm: "2.5rem",
                      md: "3rem",
                    },
                  }}
                >
                  مشروع لائحة بريح تستحق
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
                    fontSize: {
                      xs: "0.9rem",
                      sm: "1.2rem",
                      md: "1.5rem",
                    },
                  }}
                >
                  رؤيتنا التنموية لنهضة شاملة في بريح الشوف
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Fade>
        {/* Team Members Section */}
        <Slide direction="up" in={true} timeout={500} mountOnEnter>
          <Box
            id="members"
            sx={{ mb: { xs: 3, sm: 4 }, scrollMarginTop: "80px" }}
          >
            <Paper
              elevation={0}
              sx={{
                borderRadius: { xs: 2, sm: 3 },
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              {/* Section Header */}
              <Box
                sx={{
                  p: { xs: 2, sm: 2.5 },
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  color: "white",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant={isMobile ? "h6" : "h4"}
                  component="h1"
                  sx={{
                    fontWeight: "bold",
                  }}
                  color="primary.main"
                >
                  أعضاء اللائحة
                </Typography>
              </Box>

              {/* Members Grid */}
              <Box sx={{ p: { xs: 2, sm: 3 } }}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "repeat(2, 1fr)", // Show 2 items per row on extra-small screens
                      sm: "repeat(2, 1fr)",
                      md: "repeat(4, 1fr)",
                    },
                    gap: { xs: 2, sm: 3 },
                  }}
                >
                  {members.map((member) => (
                    <Box
                      key={member.id}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                        },
                      }}
                    >
                      <Avatar
                        src={member.image}
                        alt={member.name}
                        sx={{
                          width: { xs: 100, sm: 120, md: 130 },
                          height: { xs: 100, sm: 120, md: 130 },
                          mb: 1.5,
                          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                          border: "1px solid red",
                        }}
                      />
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: "bold",
                          color: "text.primary",
                          fontSize: { xs: "0.95rem", sm: "1rem" },
                        }}
                      >
                        {member.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Paper>
          </Box>
        </Slide>
        {/* Section Content */}
        {sections.map((section, index) => (
          <Slide
            key={section.id}
            direction="up"
            in={true}
            timeout={300 + index * 100}
            mountOnEnter
            unmountOnExit
          >
            <Box
              id={section.id}
              sx={{
                mb: { xs: 3, sm: 4 },
                scrollMarginTop: "80px",
              }}
            >
              <Paper
                elevation={2}
                sx={{
                  borderRadius: { xs: 2, sm: 3 },
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                  },
                }}
              >
                {/* Section Header */}
                <Box
                  sx={{
                    p: { xs: 2, sm: 2.5 },
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    bgcolor: "primary.main",
                    color: "white",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "white",
                      color: "primary.main",
                      width: { xs: 36, sm: 44 },
                      height: { xs: 36, sm: 44 },
                    }}
                  >
                    {React.cloneElement(section.icon, {
                      fontSize: isMobile ? "small" : "medium",
                    })}
                  </Avatar>
                  <Typography
                    variant={isMobile ? "h6" : "h5"}
                    component="h2"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    {section.title}
                  </Typography>
                </Box>

                {/* Section Content - Items List */}
                <List sx={{ py: 0 }}>
                  {section.items.map((item, itemIndex) => (
                    <ListItem
                      key={itemIndex}
                      sx={{
                        py: { xs: 2, sm: 2.5 },
                        px: { xs: 2, sm: 3 },
                        flexDirection: "column",
                        alignItems: "flex-start",
                        "&:not(:last-child)": {
                          borderBottom: "1px solid rgba(0,0,0,0.08)",
                        },
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: "bold",
                          color: "text.primary",
                          fontSize: { xs: "0.95rem", sm: "1.1rem" },
                          mb: 0.5,
                          width: "100%",
                          textAlign: "right",
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontSize: { xs: "0.85rem", sm: "0.95rem" },
                          width: "100%",
                          textAlign: "right",
                          lineHeight: 1.6,
                        }}
                      >
                        {item.description}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Box>
          </Slide>
        ))}
      </Container>
    </Box>
  );
}
