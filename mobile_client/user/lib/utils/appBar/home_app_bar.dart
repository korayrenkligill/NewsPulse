import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class HomeAppBar extends StatelessWidget implements PreferredSizeWidget {
  final String title;
  final String tooltip;
  final IconData icon;
  final void Function()? onPressed;
  const HomeAppBar({
    super.key,
    required this.title,
    required this.icon,
    required this.tooltip,
    this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return AppBar(
      systemOverlayStyle: SystemUiOverlayStyle.dark.copyWith(statusBarColor: Colors.transparent),
      title: Text(title),
      centerTitle: false,
      backgroundColor: const Color(0x00000000),
      foregroundColor: Colors.black,
      elevation: 0,
      actions: [
        Center(child: IconButton(onPressed: onPressed, icon: Icon(icon), tooltip: tooltip)),
      ],
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
