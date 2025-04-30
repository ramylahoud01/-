import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useMediaQuery,
  Drawer,
  Menu,
  MenuItem,
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
} from "@mui/icons-material";

// Process sections data by splitting items into title and description
const sections = [
  {
    id: "legal",
    title: "الشق القانوني",
    icon: <GavelIcon fontSize="medium" />,
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
    icon: <BuildIcon fontSize="medium" />,
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
    icon: <SpaIcon fontSize="medium" />,
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
    icon: <BeachAccessIcon fontSize="medium" />,
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
    icon: <DevicesIcon fontSize="medium" />,
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
    icon: <HealthAndSafetyIcon fontSize="medium" />,
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
    icon: <SportsSoccerIcon fontSize="medium" />,
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

export default function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activeSection, setActiveSection] = useState("legal");
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    setMobileMenuAnchor(null);

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  return (
    <Box sx={{ minHeight: "100vh", direction: "rtl" }}>
      <AppBar
        position="sticky"
        sx={{
          backdropFilter: "blur(20px)",
          boxShadow: "none",
          bgcolor: "white",
          width: "100%",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo on the left */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="/public/logo.png"
              alt="Logo"
              style={{
                height: 75,
                maxWidth: isMobile ? 120 : 160,
                objectFit: "contain",
              }}
            />
          </Box>

          {/* Sections on the right */}
          {isMobile ? (
            <>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMobileMenuOpen}
                sx={{
                  color: "secondary.main",
                  transition: "transform 0.3s ease",
                }}
              >
                <MenuIcon
                  fontSize="small"
                  sx={{
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "scale(1.2)" },
                  }}
                />
              </IconButton>
              <Menu
                anchorEl={mobileMenuAnchor}
                open={Boolean(mobileMenuAnchor)}
                onClose={handleMobileMenuClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                PaperProps={{
                  sx: {
                    bgcolor: "white",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                {sections.map((section) => (
                  <MenuItem
                    key={section.id}
                    onClick={() => handleNavigate(section.id)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      color:
                        activeSection === section.id
                          ? "primary.main"
                          : "secondary.main",
                      borderLeft:
                        activeSection === section.id ? "2px solid" : "none",
                      borderColor: "primary.main",
                      fontWeight:
                        activeSection === section.id ? "bold" : "normal",
                      py: 1,
                      px: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: "primary.light",
                        transform: "scale(1.02)",
                      },
                    }}
                  >
                    {React.cloneElement(section.icon, {
                      sx: {
                        color:
                          activeSection === section.id
                            ? "primary.main"
                            : "secondary.main",
                        fontSize: "small",
                        transition: "transform 0.3s ease",
                      },
                    })}
                    <Typography variant="body2">{section.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              {sections.map((section) => (
                <Button
                  key={section.id}
                  onClick={() => handleNavigate(section.id)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    fontWeight:
                      activeSection === section.id ? "bold" : "normal",
                    borderBottom:
                      activeSection === section.id ? "2px solid" : "none",
                    borderColor: "primary.main",
                    borderRadius: 0,
                    mx: 0.5,
                    py: 1.5,
                    px: { sm: 1, md: 2 },
                    fontSize: { sm: "0.8rem", md: "0.9rem" },
                    color:
                      activeSection === section.id
                        ? "primary.main"
                        : "secondary.main",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "transparent",
                      transform: "scale(1.05)",
                    },
                  }}
                  startIcon={React.cloneElement(section.icon, {
                    sx: {
                      marginLeft: 1,
                      color:
                        activeSection === section.id
                          ? "primary.main"
                          : "secondary.main",
                      fontSize: "small",
                      transition: "transform 0.3s ease",
                    },
                  })}
                >
                  {section.title}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{ py: { xs: 1, sm: 4 }, px: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              borderRadius: 2,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Background image with text overlay */}
            <Box sx={{ position: "relative" }}>
              <Box
                component="img"
                src="/breeh.jpg"
                alt="Breih landscape"
                sx={{
                  width: "100%",
                  maxHeight: { xs: 250, sm: 600 },
                  objectFit: "cover",
                  display: "block",
                }}
              />

              {/* Overlay with text */}
              <Box
                sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.35)",
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
                    textShadow: "1px 1px 4px rgba(0,0,0,0.7)",
                    mb: { xs: 1, sm: 2 },
                    color: "white",
                    fontSize: {
                      xs: "1.6rem",
                      sm: "2.5rem",
                      md: "3rem",
                    },
                    maxWidth: { xs: "100%", sm: "80%" },
                    margin: "0 auto",
                    direction: "rtl", // Ensure proper RTL text direction
                  }}
                >
                  مشروع لائحة بريح تستحق
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    textShadow: "1px 1px 3px rgba(0,0,0,0.6)",
                    fontSize: {
                      xs: "0.9rem",
                      sm: "1.3rem",
                      md: "1.6rem",
                    },
                    maxWidth: { xs: "100%", sm: "80%" },
                    margin: "0 auto",
                    direction: "rtl", // Ensure proper RTL text direction
                  }}
                >
                  رؤيتنا التنموية لنهضة شاملة في بريح الشوف
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>

        {sections.map((section, index) => (
          <Box
            key={section.id}
            id={section.id}
            sx={{
              mb: { xs: 2, sm: 3 },
              borderTopLeftRadius: { xs: 12, sm: 16 },
              borderTopRightRadius: { xs: 12, sm: 16 },
              borderBottomLeftRadius: { xs: 6, sm: 8 },
              borderBottomRightRadius: { xs: 6, sm: 8 },
              overflow: "hidden",
              boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <Paper
              elevation={0}
              sx={{
                overflow: "hidden",
                borderTopLeftRadius: { xs: 12, sm: 16 },
                borderTopRightRadius: { xs: 12, sm: 16 },
                borderBottomLeftRadius: { xs: 6, sm: 8 },
                borderBottomRightRadius: { xs: 6, sm: 8 },
              }}
            >
              <Box
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  bgcolor: "rgba(240, 240, 240, 0.9)",
                  color: "white",
                  borderTopLeftRadius: { xs: 12, sm: 16 },
                  borderTopRightRadius: { xs: 12, sm: 16 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 1, sm: 2 },
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "rgba(19, 32, 60,0.8)",
                      borderRadius: "50%",
                      width: { xs: 32, sm: 40 },
                      height: { xs: 32, sm: 40 },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: { xs: 1, sm: 2 },
                    }}
                  >
                    {section.icon}
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{
                        fontWeight: "bold",
                        fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
                        transition: "color 0.3s ease",
                        "&:hover": {
                          color: "primary.dark",
                        },
                      }}
                      color="primary.main"
                    >
                      {section.title}{" "}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        opacity: 0.9,
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      }}
                    >
                      {section.subtitle}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Content area */}
              <Box sx={{ bgcolor: "white", display: "block" }}>
                <List sx={{ py: 0 }}>
                  {section.items.map((item, itemIndex) => (
                    <ListItem
                      key={itemIndex}
                      sx={{
                        py: { xs: 1.5, sm: 2 },
                        px: { xs: 2, sm: 3 },
                        "&:not(:last-child)": {
                          borderBottom: "1px solid #f0f0f0",
                        },
                      }}
                    >
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: { xs: "column", sm: "row" },
                              gap: { xs: 0.5, sm: 1 },
                            }}
                          >
                            <Typography
                              component="span"
                              sx={{
                                fontWeight: "bold",
                                color: "#333",
                                mr: 1,
                                fontSize: { xs: "0.875rem", sm: "1rem" },
                              }}
                            >
                              {item.title} :
                            </Typography>
                            <Typography
                              component="span"
                              sx={{
                                color: "#555",
                                ml: { xs: 0, sm: 1 },
                                fontSize: { xs: "0.815rem", sm: "0.938rem" },
                              }}
                            >
                              {item.description}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Paper>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
