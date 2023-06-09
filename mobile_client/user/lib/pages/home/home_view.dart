import 'package:flutter/material.dart';
import 'package:user/pages/home/home_view_model.dart';
import 'package:user/utils/appBar/home_app_bar.dart';
import 'package:user/utils/bottomNavBar/project_bottom_nav_bar.dart';

class HomeView extends StatefulWidget {
  const HomeView({super.key});

  @override
  State<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends HomeViewModel {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: HomeAppBar(
        title: appTitle,
        tooltip: searchTooltip,
        icon: Icons.search_outlined,
        onPressed: () {},
      ),
      body: tabs[currentIndex],
      bottomNavigationBar: ProjectBottomNavBar(
        currentIndex: currentIndex,
        onTap: changeCurrentIndex,
      ),
    );
  }
}
