"use client";
import React from "react";
import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  return (
    <footer className="bg-dark-900 text-white dark:bg-dark-100 dark:text-light-200 mt-12">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold">EduMarket</span>
            </div>
            <p className="text-light-400 dark:text-light-200 text-sm leading-relaxed">
              Nền tảng học trực tuyến hàng đầu Việt Nam, cung cấp các khóa học
              chất lượng cao từ những chuyên gia hàng đầu trong ngành.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-light-400 hover:text-primary-400 transition-colors"
              >
                <Icon icon="iconoir:facebook" className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-light-400 hover:text-primary-400 transition-colors"
              >
                <Icon icon="iconoir:twitter" className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-light-400 hover:text-primary-400 transition-colors"
              >
                <Icon icon="iconoir:youtube" className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-light-400 hover:text-primary-400 transition-colors"
              >
                <Icon icon="iconoir:instagram" className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              {[
                "Về chúng tôi",
                "Khóa học",
                "Giảng viên",
                "Blog",
                "Liên hệ"
              ].map((text, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-light-400 dark:text-light-200 hover:text-white dark:hover:text-light-150 transition-colors"
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Danh mục</h3>
            <ul className="space-y-2">
              {[
                "Lập trình",
                "Marketing",
                "Ngôn ngữ",
                "Thiết kế",
                "Kinh doanh"
              ].map((text, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-light-400 dark:text-light-200 hover:text-white dark:hover:text-light-150 transition-colors"
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-primary-400 mt-1" />
                <span className="text-light-400 dark:text-light-200 text-sm">
                  123 Đường ABC, Quận 1, TP. Hồ Chí Minh
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-primary-400" />
                <span className="text-light-400 dark:text-light-200 text-sm">
                  +84 123 456 789
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-primary-400" />
                <span className="text-light-400 dark:text-light-200 text-sm">
                  info@edumarket.vn
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-dark-100 dark:border-dark-600">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold mb-2">
              Đăng ký nhận thông tin mới nhất
            </h3>
            <p className="text-light-400 dark:text-light-200 text-sm mb-4">
              Nhận thông báo về khóa học mới và ưu đãi đặc biệt
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Nhập email của bạn..."
                className="flex-1 px-4 py-2 rounded-lg bg-dark-100 dark:bg-dark-900 border border-dark-700 dark:border-dark-600 text-white placeholder-light-400 focus:outline-none focus:border-primary-500"
              />
              <button
                className="px-6 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg font-medium transition-colors"
                onClick={() => router.push("/sign-up")}
              >
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-dark-100 dark:border-dark-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-light-400 dark:text-light-200 text-sm">
              © 2024 EduMarket. Tất cả quyền được bảo lưu.
            </div>
            <div className="flex items-center space-x-6">
              {["Điều khoản sử dụng", "Chính sách bảo mật", "Cookies"].map(
                (item, i) => (
                  <a
                    key={i}
                    href="#"
                    className="text-light-400 dark:text-light-200 hover:text-white dark:hover:text-light-150 text-sm transition-colors"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
            <div className="flex items-center space-x-1 text-light-400 dark:text-light-200 text-sm">
              <span>Made with</span>
              <Heart size={16} className="text-red-500" />
              <span>in Vietnam</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
