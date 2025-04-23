import pandas as pd
import matplotlib.pyplot as plt


def calculate_test_results():
    # test data
    results = [2, 3, 10, 4, 5, 6, 7, 8, 9, 10]
    df = pd.DataFrame(results, columns=['Results'])
    mean = df['Results'].mean()
    std_dev = df['Results'].std()
    variance = df['Results'].var()
    median = df['Results'].median()
    mode = df['Results'].mode()[0]
    maximum = df['Results'].max()
    minimum = df['Results'].min()
    range_ = maximum - minimum
    percentile_25 = df['Results'].quantile(0.25)
    percentile_75 = df['Results'].quantile(0.75)

    return {
        'results': results,
        'mean': mean,
        'std_dev': std_dev,
        'variance': variance,
        'median': median,
        'mode': mode,
        'maximum': maximum,
        'minimum': minimum,
        'range_': range_,
        'percentile_25': percentile_25,
        'percentile_75': percentile_75,
    }


def Main():
    stats = calculate_test_results()
    results = stats['results']
    print("Резултати от теста:", results)
    print("Средно:", stats['mean'])
    print("Стандартно отклонение:", stats['std_dev'])
    print("Дисперсия:", stats['variance'])
    print("Медиана:", stats['median'])
    print("Мода:", stats['mode'])
    print("Максимум:", stats['maximum'])
    print("Минимум:", stats['minimum'])
    print("Обхват:", stats['range_'])
    print("25-ти процентил:", stats['percentile_25'])
    print("75-ти процентил:", stats['percentile_75'])
    print("Интерквартилен обхват:", stats['iqr'])
    save_plots(results)
    print("Графиките са запазени в папка images")

def save_plots(results):
    df = pd.DataFrame(results, columns=['Results'])
    plt.plot(df['Results'])
    plt.title('Test Results')
    plt.xlabel('Test Number')
    plt.ylabel('Result')
    plt.savefig('images/test_results.png')
    plt.close()
    
    plt.hist(df['Results'], bins=10, alpha=0.7, color='blue')  
    plt.title('Histogram of Test Results')
    plt.xlabel('Result')
    plt.ylabel('Frequency')
    plt.savefig('images/histogram.png')
    plt.close()
    
    plt.boxplot(df['Results'])
    plt.title('Boxplot of Test Results')
    plt.ylabel('Result')
    plt.savefig('images/boxplot.png')
    plt.close()

if __name__ == "__main__":
    Main()
