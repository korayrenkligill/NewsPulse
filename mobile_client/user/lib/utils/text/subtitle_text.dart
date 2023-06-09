import 'package:flutter/material.dart';

class TextSubtitle extends StatelessWidget {
  final String text;
  const TextSubtitle({super.key, required this.text});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: Theme.of(context).textTheme.titleLarge,
    );
  }
}
