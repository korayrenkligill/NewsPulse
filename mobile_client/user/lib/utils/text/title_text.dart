import 'package:flutter/material.dart';

class TextTitle extends StatelessWidget {
  final String text;
  final TextOverflow overflow;
  const TextTitle({super.key, required this.text, required this.overflow});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: Theme.of(context).textTheme.headlineSmall,
      overflow: overflow,
      maxLines: overflow == TextOverflow.ellipsis ? 1 : null,
    );
  }
}
