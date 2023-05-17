import 'package:admin/pages/login/login_view.dart';
import 'package:admin/pages/panel/panel_view_model.dart';
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Panel',
      initialRoute: 'login',
      routes: {
        'panel': (context) => const PanelView(),
        'login': (context) => const LoginView(),
      },
    );
  }
}
