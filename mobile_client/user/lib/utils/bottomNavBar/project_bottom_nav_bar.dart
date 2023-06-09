import 'package:flutter/material.dart';

class ProjectBottomNavBar extends StatelessWidget {
  final int currentIndex;
  final void Function(int)? onTap;
  const ProjectBottomNavBar({
    super.key,
    required this.currentIndex,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      elevation: 0,
      currentIndex: currentIndex,
      showUnselectedLabels: false,
      fixedColor: Colors.grey,
      unselectedItemColor: Colors.black,
      type: BottomNavigationBarType.shifting,
      onTap: onTap,
      items: const [
        BottomNavigationBarItem(
          icon: Icon(Icons.home_outlined),
          activeIcon: Icon(Icons.home_rounded),
          label: 'Home',
          tooltip: 'Home',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.sports_baseball_outlined),
          activeIcon: Icon(Icons.sports_baseball_rounded),
          label: 'Sports',
          tooltip: 'Sports',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.cloud_outlined),
          activeIcon: Icon(Icons.cloud_rounded),
          label: 'Weather',
          tooltip: 'Weather',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.show_chart_outlined),
          activeIcon: Icon(Icons.show_chart_rounded),
          label: 'Finance',
          tooltip: 'Finance',
        ),
      ],
    );
  }
}
