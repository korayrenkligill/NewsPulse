import 'package:flutter/material.dart';
import 'package:user/pages/home/home_view.dart';
import 'package:user/pages/tabs/financeTab/finance_tab_view.dart';
import 'package:user/pages/tabs/homeTab/home_tab_view.dart';
import 'package:user/pages/tabs/sportsTab/sports_tab_view.dart';
import 'package:user/pages/tabs/weatherTab/weather_tab_view.dart';

abstract class HomeViewModel extends State<HomeView> {
  String appTitle = 'NewsPulse';
  String searchTooltip = 'Search';

  // Bottom Navigation Bar
  int currentIndex = 0;

  final tabs = [
    const HomeTabView(),
    const SportsTabView(),
    const WeatherTabView(),
    const FinanceTabView(),
  ];

  void changeCurrentIndex(int i) {
    setState(() {
      currentIndex = i;
    });
  }
}
